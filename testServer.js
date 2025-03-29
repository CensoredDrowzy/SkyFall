const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Simple test endpoint
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Simple login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === 'Drowzy' && password === 'ChristianC1123!') {
        return res.json({ success: true, message: 'Login successful' });
    }
    
    res.json({ success: false, message: 'Invalid credentials' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
    console.log('Test credentials:');
    console.log('Username: Drowzy');
    console.log('Password: ChristianC1123!');
});