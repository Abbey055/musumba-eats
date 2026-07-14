// server.js - Express server for Hydra brute force demo
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.post('/login', (req, res) => {
    const username = req.body.username || '';
    const password = req.body.password || '';
    
    if (username === 'admin' && password === 'password') {
        // ✅ SUCCESS: Return a clear success response
        res.send('Login successful');
    } else {
        // ❌ FAIL: Return the EXACT fail string Hydra is looking for
        res.send('Invalid credentials');
    }
});

app.use((req, res) => {
    res.status(403).sendFile(path.join(__dirname, '403.html'));
});

app.listen(PORT, () => {
    console.log(`🔐 Server running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`📋 Login endpoint: http://localhost:${PORT}/login`);
});