const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8897925715',
    database: 'delicios'
});

db.connect((err) => {
    if (err) throw err;
    console.log('✅ MySQL Connected!');
});

// Make db accessible in routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// API Routes
app.use('/api/auth', authRoutes);   
app.use('/api/users', userRoutes);  

// Optional: Small test route (not frontend)
app.get('/', (req, res) => {
    res.send('✅ Delicios Server Running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
