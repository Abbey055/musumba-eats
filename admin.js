document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    const form = document.getElementById('loginForm');
    
    // ⚠️ VULNERABLE: Hardcoded credentials (for demonstration only!)
    if (username === 'admin' && password === 'password123') {
        // Login successful
        errorMsg.style.color = '#2E7D32';
        errorMsg.textContent = '✅ Login successful! Redirecting...';
        
        // Store login session - THIS IS CRITICAL
        localStorage.setItem('adminLoggedIn', 'true');
        
        // Disable button to prevent multiple clicks
        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.textContent = '⏳ Redirecting...';
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        // Login failed - Generic message (no hint)
        errorMsg.style.color = '#e74c3c';
        errorMsg.textContent = '❌ Invalid credentials. Please try again.';
        
        // Shake animation
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
        
        // Clear password field
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
});

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = 'dashboard.html';
}