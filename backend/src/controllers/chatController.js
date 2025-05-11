// controllers/chatController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * GET /api/chat-rooms
 * Повертає всі кімнати, в яких бере участь поточний користувач,
 * з останнім повідомленням та списком учасників.
 */
exports.listChatRooms = async (req, res) => {
    try {
      const userId = req.user.id;
      const rooms = await prisma.chat_rooms.findMany({
        where: {
          room_users: {
            some: { userId }
          }
        },
        include: {
          room_users: {
            include: {
              user: {
                select: { id: true, username: true }
              }
            }
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1
          },
          _count: {
            select: {
              messages: {
                where: {
                  status: 'Sent',
                  senderId: { not: userId }
                }
              }
            }
          }
        }
      });
  
      rooms.forEach((room, index) => {
        console.log(`Room ${index + 1}: ${JSON.stringify(room._count)}`);
      });  
      const result = rooms.map(r => {
        // Захищено на випадок, якщо room_users не масив
        const participants = Array.isArray(r.room_users)
          ? r.room_users.map(ru => ({
              id: ru.user.id,
              username: ru.user.username,
            }))
          : [];
  
        // Захищено на випадок, якщо messages не масив
        const lastMessage = Array.isArray(r.messages) && r.messages.length > 0
          ? r.messages[0]
          : null;
  
        return {
          id: r.id,
          theme: r.theme,
          participants,
          lastMessage,
          unreadCount: r._count.messages || 0,
        };
      });
  
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  };

/**
 * POST /api/chat-rooms
 * Створює нову кімнату з поточним користувачем і (опційно) партнером.
 * Тіло запиту: { theme: string, partnerId?: number }
 */
// avatar!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.createChatRoom = async (req, res) => {
  const { theme, partnerId } = req.body;
  const userId = req.user.id;

  if (!theme) {
    return res.status(400).json({ error: "Не вказано тему кімнати" });
  }

  try {
    const connectUsers = [{ id: userId }];
    if (partnerId) {
      connectUsers.push({ id: partnerId });
    }

    const room = await prisma.chat_rooms.create({
      data: {
        theme,
        room_users: {
          create: connectUsers.map(u => ({ user: { connect: { id: u.id } } }))
        }
      },
      include: {
        room_users: {
          include: { user: true }
        }
      }
    });

    // Формуємо відповідь у стилі listChatRooms
    const participants = room.room_users.map(ru => ({
      id: ru.user.id,
      username: ru.user.username,
      avatar: ru.user.avatar || null
    }));

    res.status(201).json({
      id: room.id,
      theme: room.theme,
      participants,
      lastMessage: null
    });
  } catch (err) {
    console.error("createChatRoom error:", err);
    res.status(500).json({ error: "Не вдалося створити чат-кімнату" });
  }
};

/**
 * GET /api/chat-rooms/:roomId/messages
 * Повертає всі повідомлення з кімнати roomId (за зростанням createdAt).
 */
exports.listMessages = async (req, res) => {
  const roomId = parseInt(req.params.roomId, 10);
  const userId = req.user.id;

  // 🔒 Перевірка коректності roomId
  if (!roomId || isNaN(roomId)) {
    return res.status(400).json({ error: "Невірний roomId" });
  }

  try {
    // 🔐 Перевірка, що користувач має доступ до кімнати
    const membership = await prisma.room_users.findUnique({
      where: { userId_roomId: { userId, roomId } }
    });

    if (!membership) {
      return res.status(403).json({ error: "Доступ заборонений" });
    }

    // 📥 Отримання всіх повідомлень кімнати з відправником
    const messages = await prisma.chat_messages.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    // ✅ Повертаємо структуровану відповідь
    return res.json({
      roomId,
      messages: messages.map(m => ({
        id: m.id,
        content: m.content,
        createdAt: m.createdAt,
        status: m.status,
        sender: {
          id: m.sender.id,
          username: m.sender.username,
          avatar: m.sender.avatar || null
        }
      }))
    });
  } catch (err) {
    console.error("❌ listMessages error:", err);
    return res.status(500).json({ error: "Не вдалося завантажити повідомлення" });
  }
};


/**
 * POST /api/chat-rooms/:roomId/messages
 * Створює нове повідомлення в кімнаті roomId.
 * Тіло запиту: { content: string }
 */
exports.sendMessage = async (req, res) => {
  const roomId = parseInt(req.params.roomId, 10);
  const userId = req.user.id;
  const { content } = req.body;

  if (!roomId || !content) {
    return res.status(400).json({ error: "Невірні дані" });
  }

  try {
    // Перевіримо приналежність до кімнати
    const membership = await prisma.room_users.findUnique({
      where: { userId_roomId: { userId, roomId } }
    });
    if (!membership) {
      return res.status(403).json({ error: "Доступ заборонений" });
    }

    const message = await prisma.chat_messages.create({
      data: {
        content,
        room: { connect: { id: roomId } },
        sender: { connect: { id: userId } }
      },
      include: {
        sender: { select: { id: true, username: true, avatar: true } }
      }
    });

    res.status(201).json({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      status: message.status,
      sender: {
        id: message.sender.id,
        username: message.sender.username,
        avatar: message.sender.avatar || null
      }
    });
  } catch (err) {
    console.error("sendMessage error:", err);
    res.status(500).json({ error: "Не вдалося надіслати повідомлення" });
  }
};
