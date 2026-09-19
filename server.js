/**
 * KindredMatch - Dedicated Backend Engine
 * Express + SQLite + JWT Authentication
 */

const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'kindredmatch_super_secure_key_2026';

app.use(cors());
app.use(express.json({ limit: '15mb' })); // Support base64 image uploads

// ----------------------------------------------------
// 1. DATABASE SCHEMA INITIALIZATION
// ----------------------------------------------------
const db = new Database(path.join(__dirname, 'kindredmatch.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    college TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    email_verified INTEGER DEFAULT 0,
    phone_verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS organizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    reg_id TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    address TEXT,
    contact_phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS opportunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    org_id INTEGER,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    address TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    image_url TEXT,
    match_score INTEGER DEFAULT 95,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(org_id) REFERENCES organizations(id)
  );

  CREATE TABLE IF NOT EXISTS completed_works (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    opportunity_id INTEGER,
    role TEXT NOT NULL,
    org_name TEXT NOT NULL,
    hours INTEGER DEFAULT 4,
    verified_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// ----------------------------------------------------
// 2. SEED DEFAULT BANGALORE HUBS IF EMPTY
// ----------------------------------------------------
const rowCount = db.prepare('SELECT COUNT(*) as count FROM opportunities').get();
if (rowCount.count === 0) {
  const insertStmt = db.prepare(`
    INSERT INTO opportunities (title, category, location, address, contact_email, contact_phone, image_url, match_score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialSeed = [
    ["Teaching Centers", "EDUCATION", "HSR Layout, Bengaluru", "CA:39, 15th Cross, HSR Layout, Bengaluru 560102", "info@samarthanam.org", "+91 80 2572 1444", "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800", 96],
    ["Medical Centers", "HEALTHCARE", "Bengaluru Central", "Bengaluru Hospice Trust, Off HAL Airport Rd", "info@karunashraya.org", "+91 80 4268 5666", "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800", 91],
    ["Environmental Centers", "ENVIRONMENT", "Bellandur, Bengaluru", "102, Royal Palms, Outer Ring Road, Bellandur 560103", "info@saytrees.org", "+91 99 7255 1251", "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800", 94],
    ["Community Welfare Centres", "COMMUNITY", "Indiranagar, Bengaluru", "Indiranagar 100 Feet Road, Bengaluru 560038", "robinhoodarmyblr@gmail.com", "+91 89 7192 2333", "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800", 90],
    ["Animal Welfare Centres", "ANIMAL WELFARE", "Hebbal, Bengaluru", "KVAFSU Campus, Veterinary College, Hebbal 560024", "cupablr@gmail.com", "+91 80 2294 7307", "https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg?auto=compress&cs=tinysrgb&w=800", 89]
  ];

  initialSeed.forEach(item => insertStmt.run(...item));
}

// ----------------------------------------------------
// 3. AUTHENTICATION MIDDLEWARE
// ----------------------------------------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired session token' });
    req.user = user;
    next();
  });
}

// ----------------------------------------------------
// 4. VOLUNTEER AUTHENTICATION ROUTES
// ----------------------------------------------------
app.post('/api/volunteer/signup', async (req, res) => {
  try {
    const { name, college, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare(`
      INSERT INTO users (name, college, email, password) VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(name, college || '', email.toLowerCase(), hashedPassword);

    const token = jwt.sign({ id: result.lastInsertRowid, type: 'student', email: email.toLowerCase() }, JWT_SECRET, { expiresIn: '14d' });
    res.json({ token, user: { id: result.lastInsertRowid, type: 'student', name, college, email, emailVerified: false, phoneVerified: false, completedWorks: [] } });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Email already registered. Please log in.' });
    }
    res.status(500).json({ error: 'Server error during sign up' });
  }
});

app.post('/api/volunteer/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    const completedWorks = db.prepare('SELECT * FROM completed_works WHERE user_id = ?').all(user.id);
    const token = jwt.sign({ id: user.id, type: 'student', email: user.email }, JWT_SECRET, { expiresIn: '14d' });

    res.json({
      token,
      user: {
        id: user.id,
        type: 'student',
        name: user.name,
        college: user.college,
        email: user.email,
        phone: user.phone || '',
        emailVerified: !!user.email_verified,
        phoneVerified: !!user.phone_verified,
        completedWorks: completedWorks || []
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ----------------------------------------------------
// 5. NGO / ORGANIZATION AUTHENTICATION ROUTES
// ----------------------------------------------------
app.post('/api/org/signup', async (req, res) => {
  try {
    const { name, regId, email, password } = req.body;
    if (!name || !regId || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare(`
      INSERT INTO organizations (name, reg_id, email, password) VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(name, regId, email.toLowerCase(), hashedPassword);

    const token = jwt.sign({ id: result.lastInsertRowid, type: 'org', name }, JWT_SECRET, { expiresIn: '14d' });
    res.json({ token, org: { id: result.lastInsertRowid, type: 'org', name, email } });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Organization email already registered' });
    }
    res.status(500).json({ error: 'Server error registering organization' });
  }
});

app.post('/api/org/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const org = db.prepare('SELECT * FROM organizations WHERE email = ?').get(email.toLowerCase());
    if (!org) return res.status(401).json({ error: 'Organization credentials invalid' });

    const match = await bcrypt.compare(password, org.password);
    if (!match) return res.status(401).json({ error: 'Organization credentials invalid' });

    const token = jwt.sign({ id: org.id, type: 'org', name: org.name }, JWT_SECRET, { expiresIn: '14d' });
    res.json({ token, org: { id: org.id, type: 'org', name: org.name, email: org.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error during organization login' });
  }
});

// ----------------------------------------------------
// 6. OPPORTUNITIES / VOLUNTEER CATEGORIES (PERSISTED)
// ----------------------------------------------------
app.get('/api/opportunities', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM opportunities ORDER BY id DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve opportunities' });
  }
});

app.post('/api/opportunities', authenticateToken, (req, res) => {
  try {
    if (req.user.type !== 'org') {
      return res.status(403).json({ error: 'Only registered organizations can post opportunities' });
    }

    const { title, category, location, address, contact_email, contact_phone, image_url } = req.body;
    if (!title || !category) {
      return res.status(400).json({ error: 'Title and Category are mandatory' });
    }

    const stmt = db.prepare(`
      INSERT INTO opportunities (org_id, title, category, location, address, contact_email, contact_phone, image_url, match_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 95)
    `);

    const result = stmt.run(
      req.user.id,
      title,
      category.toUpperCase(),
      location || 'Bengaluru, Karnataka',
      address || location || 'Bengaluru',
      contact_email || req.user.email || 'contact@ngo.org',
      contact_phone || '+91 80 0000 0000',
      image_url || 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800'
    );

    const created = db.prepare('SELECT * FROM opportunities WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create opportunity' });
  }
});

// Start backend
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});