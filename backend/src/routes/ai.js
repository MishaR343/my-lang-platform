// routes/ai.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController.js');
const authenticate = require('../middleware/authMiddleware');

router.post('/improve', authenticate, aiController.improveMessage);
// router.post('/explain', authenticate, aiController.explainMessage);
// router.post('/generate-task', authenticate, aiController.generateTask);

module.exports = router;
