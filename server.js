// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/memoApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Memo schema and model
const memoSchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now },
});

const Memo = mongoose.model('Memo', memoSchema);

// Routes
app.get('/api/memos', async (req, res) => {
  try {
    const memos = await Memo.find();
    res.json(memos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/memos', async (req, res) => {
  const { content } = req.body;
  const memo = new Memo({ content });

  try {
    const savedMemo = await memo.save();
    res.json(savedMemo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
