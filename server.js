const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./inventaris.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS barang (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT,
        part_number TEXT,
        nama TEXT,
        stok_awal INTEGER,
        uom TEXT,
        note TEXT,
        stok_akhir INTEGER
    )`);
});

app.get('/api/barang', (req, res) => {
    db.all("SELECT * FROM barang", [], (err, rows) => res.json(rows));
});

app.post('/api/tambah', (req, res) => {
    const { brand, part_number, nama, stok_awal, uom, note } = req.body;
    db.run("INSERT INTO barang (brand, part_number, nama, stok_awal, uom, note, stok_akhir) VALUES (?,?,?,?,?,?,?)", 
    [brand, part_number, nama, stok_awal, uom, note, stok_awal], () => res.json({ status: "ok" }));
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));