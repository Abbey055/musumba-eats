// admin.js - Sends credentials to server
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    const form = document.getElementById('loginForm');
    
    try {
        // Send POST request to server
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });
        
        const responseText = await response.text();
        
        // Check for success (response contains "Login successful")
        if (responseText.includes('Login successful')) {
            // Login successful
            localStorage.setItem('adminLoggedIn', 'true');
            errorMsg.style.color = '#2E7D32';
            errorMsg.textContent = '✅ Login successful! Redirecting...';
            
            const btn = form.querySelector('button');
            btn.disabled = true;
            btn.textContent = '⏳ Redirecting...';
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Login failed
            errorMsg.style.color = '#e74c3c';
            errorMsg.textContent = 'Invalid credentials. Please try again';
            
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
            }, 500);
            
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    } catch (error) {
        errorMsg.style.color = '#e74c3c';
        errorMsg.textContent = '❌ Server error. Please try again.';
        console.error('Login error:', error);
    }
});

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'dashboard.html';
}