let cart = [];
let total = 0;

// Add item to cart with quantity support
function addToCart(itemName, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            name: itemName, 
            price: price, 
            quantity: 1 
        });
    }
    
    updateCart();
    
    // Visual feedback on button
    const buttons = document.querySelectorAll('.menu-item button');
    buttons.forEach(btn => {
        if (btn.textContent.includes('Add to Cart')) {
            btn.textContent = '✅ Added!';
            btn.style.background = '#2E7D32';
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.background = '#D2691E';
            }, 1500);
        }
    });
}

// Update cart display
function updateCart() {
    const cartDiv = document.getElementById('cart');
    const totalSpan = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    
    if (cart.length === 0) {
        cartDiv.innerHTML = `
            <div class="empty-cart">
                <p>🍽️</p>
                <p style="font-size:1.2rem; font-weight:600; color:#2c1810;">Your cart is empty</p>
                <p style="color:#999; font-size:0.9rem;">Browse our delicious menu above!</p>
            </div>
        `;
        totalSpan.textContent = '0';
        if (cartCount) cartCount.textContent = '0';
        return;
    }
    
    let html = '';
    total = 0;
    let itemCount = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        html += `
            <div class="cart-item">
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-details">UGX ${item.price.toLocaleString()} × ${item.quantity}</span>
                </div>
                <div class="item-actions">
                    <span class="item-total">UGX ${itemTotal.toLocaleString()}</span>
                    <button class="remove-btn" onclick="removeItem(${index})" title="Remove item">✕</button>
                </div>
            </div>
        `;
    });
    
    cartDiv.innerHTML = html;
    totalSpan.textContent = total.toLocaleString();
    if (cartCount) cartCount.textContent = itemCount;
}

// Remove single item from cart
function removeItem(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

// Clear entire cart
function clearCart() {
    if (cart.length === 0) return;
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCart();
    }
}

// Place order
function placeOrder() {
    if (cart.length === 0) {
        alert('🍽️ Your cart is empty! Add some delicious food first.');
        return;
    }
    
    const orderSummary = cart.map(item => 
        `${item.name} × ${item.quantity} = UGX ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const message = `🍲 **New Order from Musumba Eats!**\n\n📋 Order Summary:\n${orderSummary}\n\n💰 Total: UGX ${total.toLocaleString()}\n\n📦 Thank you for ordering!\n⏱️ Delivery in 30-45 minutes.\n\n📍 Please have your cash ready.`;
    
    alert(message);
    
    // Reset cart
    cart = [];
    updateCart();
}