const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

router.get('/messages', authenticate, async (req, res) => {
  // req.user — користувач з токена
  res.json({ messages: [/* ... */] });
});

module.exports = router;
