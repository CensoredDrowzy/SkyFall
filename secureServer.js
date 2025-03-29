require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const { verifyToken } = require('./middleware/security');
const jwt = require('jsonwebtoken');
const configureServer = require('./config/serverConfig');

const app = express();
app.use(express.json()); // Add JSON body parsing
app.use(express.urlencoded({ extended: true })); // Add URL-encoded body parsing
configureServer(app);

// Configure admin credentials
const ADMIN_USERNAME = 'Drowzy';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 
    '$2a$12$xE5YvWY3JwQzQQzqQ9T7Ue9V9k9sN9D0r9N9D0r9N9D0r9N9D0r9N9D';

// Production authentication endpoint
app.post('/admin-auth', async (req, res) => {
    // Production logging
    console.log('Production login attempt from:', req.ip);
    // Enable CORS for production
    res.header('Access-Control-Allow-Origin', 'https://skyfallcheats.shop');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    // Simple credential check
    const { username, password } = req.body;
    if (username === 'Drowzy' && password === 'ChristianC1123!') {
        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.json({ success: true, token });
    }
    try {
        const { username, password } = req.body;
        
        if (username !== ADMIN_USERNAME || !await bcrypt.compare(password, ADMIN_PASSWORD_HASH)) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username: ADMIN_USERNAME },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ success: true, token });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ success: false, message: 'Authentication failed' });
    }
});

// Protected routes
app.use('/admin*', verifyToken);

// Logout endpoint
app.post('/logout', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        require('./middleware/security').tokenBlacklist.add(token);
    }
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Secure server running on port ${PORT}`);
    console.log(`Admin username: ${ADMIN_USERNAME}`);
});