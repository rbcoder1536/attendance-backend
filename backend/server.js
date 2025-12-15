import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "supersecretkey";
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    time TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS leaves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start TEXT,
    end TEXT,
    reason TEXT,
    status TEXT
  )`);
});

// seed admin user
db.get("SELECT * FROM users WHERE email='admin@company.com'", async (_, row) => {
  if (!row) {
    const hash = await bcrypt.hash("admin123", 10);
    db.run("INSERT INTO users (email,password) VALUES (?,?)", [
      "admin@company.com",
      hash,
    ]);
  }
});

// auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email=?", [email], async (_, user) => {
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1d" });
    res.json({ token });
  });
});

app.get("/stats", auth, (_, res) => {
  db.get("SELECT COUNT(*) c FROM attendance", (_, a) => {
    db.get("SELECT COUNT(*) c FROM leaves", (_, l) => {
      db.get("SELECT COUNT(*) c FROM leaves WHERE status='Pending'", (_, p) => {
        res.json({ present: a.c, leaves: l.c, pending: p.c });
      });
    });
  });
});

app.post("/checkin", auth, (_, res) => {
  const now = new Date();
  db.run(
    "INSERT INTO attendance (date,time) VALUES (?,?)",
    [now.toISOString().split("T")[0], now.toLocaleTimeString()],
    () => res.json({ ok: true })
  );
});

app.get("/attendance", auth, (_, res) => {
  db.all("SELECT * FROM attendance ORDER BY id DESC", [], (_, rows) =>
    res.json(rows)
  );
});

app.post("/leave", auth, (req, res) => {
  const { start, end, reason } = req.body;
  db.run(
    "INSERT INTO leaves VALUES (NULL,?,?,?,'Pending')",
    [start, end, reason],
    () => res.json({ ok: true })
  );
});

app.get("/leaves", auth, (_, res) => {
  db.all("SELECT * FROM leaves ORDER BY id DESC", [], (_, rows) =>
    res.json(rows)
  );
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
