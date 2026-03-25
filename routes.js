const express = require('express');
const router = express.Router();
const db = require('./db');

// GET /users
router.get('/users', (req, res) => {
  const { search = '', sort = 'name', order = 'asc' } = req.query;

  const query = `
    SELECT * FROM users
    WHERE name LIKE ?
    ORDER BY ${sort} ${order.toUpperCase()}
  `;

  db.all(query, [`%${search}%`], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /users/:id
router.get('/users/:id', (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ message: 'User not found' });
    res.json(row);
  });
});

// POST /users
router.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name & email required' });
  }

  db.run(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    function (err) {
      res.status(201).json({ id: this.lastID, name, email });
    }
  );
});

// PUT /users/:id
router.put('/users/:id', (req, res) => {
  const { name, email } = req.body;

  db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, req.params.id],
    function () {
      if (this.changes === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'Updated' });
    }
  );
});

// DELETE /users/:id
router.delete('/users/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], function () {
    if (this.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;
