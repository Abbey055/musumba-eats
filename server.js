// server.js - Express server for Hydra brute force demo
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// ============================================
// LOGIN ENDPOINT - For Hydra brute force
// ============================================
app.post('/login', (req, res) => {
    const username = req.body.username || '';
    const password = req.body.password || '';
    
    // ⚠️ VULNERABLE: Hardcoded credentials (for demonstration only!)
    if (username === 'admin' && password === 'password') {
        // ✅ SUCCESS: Simple response (Hydra detects NO fail string)
        res.send('SUCCESS');
    } else {
        // ❌ FAIL: EXACT match for Hydra detection
        res.send('Invalid credentials');
    }
});

// ============================================
// FALLBACK: Handle 404s
// ============================================
app.use((req, res) => {
    res.status(403).sendFile(path.join(__dirname, '403.html'));
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`🔐 Server running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`📋 Login endpoint: http://localhost:${PORT}/login`);
});