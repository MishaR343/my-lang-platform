// Express (backend/index.js)
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => res.send('pong'));

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
