const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

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
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Користувач вже існує" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        username,
        country,
        nativeLang,
        targetLang,
        level,
        // role встановлюється за замовчуванням як "user"
      },
    });

    res.status(201).json({ message: "Користувач створений", userId: newUser.id });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Помилка під час реєстрації" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      })
      .json({ message: "Успішний вхід", username: user.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Помилка під час входу" });
  }
};
