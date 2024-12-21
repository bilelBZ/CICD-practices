const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5002;

const corsOptions = {
    origin: '*', // or '*' for any origin in development ONLY
    methods: "GET,POST,DELETE", // Specify allowed methods
};
app.use(cors(corsOptions)); // Apply cors middleware with options

app.use(express.json());

const db = new sqlite3.Database('items.db', (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log('Connected to the database.');
        db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT
        )`);
    }
});

app.get('/api/items', (req, res) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
    db.run("INSERT INTO items (name, description) VALUES (?, ?)", [name, description], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Item added", id: this.lastID });
    });
});

app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM items WHERE id = ?", id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Item deleted" });
    });
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});