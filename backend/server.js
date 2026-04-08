const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors({
  origin : 'https://typewriter-e9xy-6c7gu1htk-raju-bonthas-projects.vercel.app/'
}));
app.use(express.json());

const db = new sqlite3.Database('./leaderboard.db');

// Tables
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

db.run(`
CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  wpm INTEGER,
  accuracy REAL
)`);

// Register
app.post('/register', async (req, res) => {
  const {username, password} = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, hash],
    err => {
      if (err) return res.status(400).json({error: 'User exists'});
      res.json({message: 'User created'});
    }
  );
});

// Login
app.post('/login', (req, res) => {
  const {username, password} = req.body;

  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, user) => {
      if (!user) return res.status(400).json({error: 'Invalid user'});

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({error: 'Wrong password'});

      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.json({token});
    }
  );
});

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Save Score
app.post('/score', auth, (req, res) => {
  const {wpm, accuracy} = req.body;

  db.run(
    `INSERT INTO scores (name, wpm, accuracy) VALUES (?, ?, ?)`,
    [req.user.username, wpm, accuracy],
    () => res.json({message: 'Saved'})
  );
});

// Leaderboard
app.get('/leaderboard', (req, res) => {
  db.all(
    `SELECT * FROM scores ORDER BY wpm DESC LIMIT 10`,
    [],
    (err, rows) => res.json(rows)
  );
});

app.listen(5000, () => console.log('Server running on 5000'));