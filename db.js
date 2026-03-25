const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  )
`);

module.exports = db;
