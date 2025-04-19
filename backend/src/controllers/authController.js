const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// Реєстрація нового користувача
exports.register = async (req, res) => {
  const {
    email,
    password,
    username,
    country,
    nativeLang,
    targetLang,
    level,
  } = req.body;

  try {
    const existingUser = await prisma.app_users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Користувач вже існує" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.app_users.create({
      data: {
        email,
        password: hashedPassword,
        username,
        country,
        nativeLang,
        targetLang,
        level,
      },
    });

    res.status(201).json({ message: "Користувач створений", userId: newUser.id });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Помилка під час реєстрації" });
  }
};

// Логін користувача та видача JWT у cookie
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.app_users.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Встановлюємо cookie з JWT
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "Lax",
        path: "/",
      })
      .json({ message: "Успішний вхід", username: user.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Помилка під час входу" });
  }
};

// Вихід — очищення JWT cookie
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "Lax",
      path: "/",
    });
    res.status(200).json({ message: "Вихід успішний" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Помилка при виході" });
  }
};

// Повернення інформації про поточного користувача
exports.me = async (req, res) => {
  // Забороняємо кешування
  res.set("Cache-Control", "no-store");
  // req.user наповнюється middleware authenticate
  res.json({
    id: req.user.id,
    username: req.user.username,
    role: req.user.role,
  });
};

// в authController.js
exports.check = (req, res) => {
  // Перевірка авторизації
  if (!req.user) {
    return res.status(401).json({ error: "Не авторизовано" });
  }
  return res.status(200).json({ message: "Ви авторизовані" });
};
