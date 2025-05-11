const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authenticate = require('../middleware/authMiddleware');

router.get('/chat-rooms', authenticate, chatController.listChatRooms);
router.post('/chat-rooms', authenticate, chatController.createChatRoom);

router.get('/chat-rooms/:roomId/messages', authenticate, chatController.listMessages);
router.post('/chat-rooms/:roomId/messages', authenticate, chatController.sendMessage);

module.exports = router;
