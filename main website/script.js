const products = [
    {
        id: 1,
        name: "8-Bit Vanilla",
        description: "A classic vanilla scent with pixelated graphics of vanilla beans",
        price: 24.99,
        image: "🕯️",
        scent: "Vanilla",
        burnTime: "50-60 hours"
    },
    {
        id: 2,
        name: "Pixel Pine",
        description: "Fresh pine forest aroma with pixel art trees",
        price: 26.99,
        image: "🌲",
        scent: "Pine",
        burnTime: "55-65 hours"
    },
    {
        id: 3,
        name: "Retro Citrus",
        description: "Zesty orange and lemon blend with retro fruit graphics",
        price: 22.99,
        image: "🍊",
        scent: "Citrus",
        burnTime: "45-55 hours"
    },
    {
        id: 4,
        name: "Cyber Lavender",
        description: "Calming lavender with neon pixel art accents",
        price: 28.99,
        image: "🔮",
        scent: "Lavender",
        burnTime: "60-70 hours"
    },
    {
        id: 5,
        name: "Arcade Amber",
        description: "Warm amber scent with pixelated arcade cabinet design",
        price: 27.99,
        image: "🎮",
        scent: "Amber",
        burnTime: "50-60 hours"
    },
    {
        id: 6,
        name: "Pixel Ocean",
        description: "Fresh ocean breeze with pixel art waves",
        price: 25.99,
        image: "🌊",
        scent: "Ocean",
        burnTime: "45-55 hours"
    },

    {
    id: 7,
    name: "Neon Rose",
    description: "Romantic rose scent with neon pixel art",
    price: 29.99,
    image: "🌹",
    scent: "Rose",
    burnTime: "60 hours"
}

];

const reviews = [
    {
        id: 1,
        name: "Alex Johnson",
        rating: 5,
        text: "The 8-Bit Vanilla candle is amazing! The pixel design is so unique and the scent lasts forever.",
        avatar: "👾"
    },
    {
        id: 2,
        name: "Sam Rivera",
        rating: 4,
        text: "Love my Pixel Pine candle! It makes my home office smell like a forest. The burn time is impressive.",
        avatar: "🎨"
    },
    {
        id: 3,
        name: "Taylor Kim",
        rating: 5,
        text: "Cyber Lavender is my new favorite. The design is so cool and the scent helps me relax after work.",
        avatar: "👩‍💻"
    },
    {
        id: 4,
        name: "Jordan Lee",
        rating: 5,
        text: "Arcade Amber takes me back to my childhood arcade days. The scent is warm and nostalgic.",
        avatar: "🕹️"
    }
];

let cart = JSON.parse(localStorage.getItem('pixelwick_cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderReviews();
    updateCartCount();
    setupEventListeners();
    simulateBackendConnectivity();
});

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
                <div class="product-details">
                    <p><strong>Scent:</strong> ${product.scent}</p>
                    <p><strong>Burn Time:</strong> ${product.burnTime}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderReviews() {
    const reviewsSlider = document.getElementById('reviewsSlider');
    
    reviewsSlider.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${review.avatar}</div>
                <div>
                    <h4 class="review-name">${review.name}</h4>
                    <div class="review-stars">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}
                    </div>
                </div>
            </div>
            <p class="review-text">"${review.text}"</p>
        </div>
    `).join('');
}

function setupEventListeners() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
        
        if (e.target.closest('.cart-icon a') || e.target.closest('.cart-icon')) {
            e.preventDefault();
            openCart();
        }
        
        if (e.target.classList.contains('close-modal') || e.target.classList.contains('modal')) {
            closeCart();
        }
        
        if (e.target.id === 'clearCart') {
            clearCart();
        }
        
        if (e.target.id === 'checkout') {
            checkout();
        }
        
        if (e.target.classList.contains('quantity-btn')) {
            const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            const isIncrease = e.target.textContent === '+';
            updateQuantity(itemId, isIncrease);
        }
        
        if (e.target.classList.contains('remove-item')) {
            const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            removeFromCart(itemId);
        }
    });
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm();
        });
    }
    
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitFeedbackForm();
        });
    }
    
    const downloadFeedbackBtn = document.getElementById('downloadFeedback');
    if (downloadFeedbackBtn) {
        downloadFeedbackBtn.addEventListener('click', downloadFeedback);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartCount();
    renderCartItems();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    renderCartItems();
}

function updateQuantity(productId, isIncrease) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    if (isIncrease) {
        item.quantity += 1;
    } else {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
    }
    
    saveCartToStorage();
    updateCartCount();
    renderCartItems();
}

function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartCount();
    renderCartItems();
    showNotification('Cart cleared!');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (subtotal > 1000) {
        discount = subtotal * 0.10;
    }
    const total = subtotal - discount;
    
    const orders = JSON.parse(localStorage.getItem('pixelwick_orders')) || [];
    const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: [...cart],
        subtotal: subtotal,
        discount: discount,
        total: total
    };
    orders.push(newOrder);
    localStorage.setItem('pixelwick_orders', JSON.stringify(orders));
    
    clearCart();
    showNotification(`Order placed successfully! Total: $${total.toFixed(2)}`, 'success');
    closeCart();
}

function openCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.add('show');
    renderCartItems();
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.remove('show');
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('subtotal').textContent = '0.00';
        document.getElementById('discount').textContent = '0.00';
        document.getElementById('total').textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn">+</button>
                <button class="remove-item"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    
    calculateTotal();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function calculateTotal() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    let discount = 0;
    if (subtotal > 1000) {
        discount = subtotal * 0.10; 
    }
    
    let total = subtotal - discount;
    
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('discount').textContent = discount.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function saveCartToStorage() {
    localStorage.setItem('pixelwick_cart', JSON.stringify(cart));
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    const submissions = JSON.parse(localStorage.getItem('pixelwick_contacts')) || [];
    submissions.push(formData);
    localStorage.setItem('pixelwick_contacts', JSON.stringify(submissions));
    showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
    form.reset();
    console.log('Contact form submission:', formData);
}

function submitFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('feedbackMessage');
    
    const formData = {
        name: document.getElementById('feedbackName').value,
        email: document.getElementById('feedbackEmail').value,
        rating: document.getElementById('feedbackRating').value,
        message: document.getElementById('feedbackMessage').value,
        timestamp: new Date().toISOString()
    };
    
    if (!formData.name || !formData.email || !formData.rating || !formData.message) {
        showFeedbackMessage('Please fill in all fields', 'error');
        return;
    }
    
    const feedbacks = JSON.parse(localStorage.getItem('pixelwick_feedbacks')) || [];
    feedbacks.push(formData);
    localStorage.setItem('pixelwick_feedbacks', JSON.stringify(feedbacks));
    showFeedbackMessage('Thank you for your feedback! We appreciate your input.', 'success');
    form.reset();
    console.log('Feedback submission:', formData);
}

function downloadFeedback() {
    const feedbacks = JSON.parse(localStorage.getItem('pixelwick_feedbacks')) || [];
    
    if (feedbacks.length === 0) {
        showFeedbackMessage('No feedback to download', 'error');
        return;
    }
    
    let textContent = 'PixelWick Feedback Report\n';
    textContent += '=' .repeat(50) + '\n\n';
    textContent += `Total Feedback Submissions: ${feedbacks.length}\n\n`;
    
    feedbacks.forEach((feedback, index) => {
        textContent += `Feedback #${index + 1}\n`;
        textContent += '-' .repeat(20) + '\n';
        textContent += `Name: ${feedback.name}\n`;
        textContent += `Email: ${feedback.email}\n`;
        textContent += `Rating: ${feedback.rating}/5 stars\n`;
        textContent += `Date: ${new Date(feedback.timestamp).toLocaleString()}\n`;
        textContent += `Message: ${feedback.message}\n\n`;
    });
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `pixelwick-feedback-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showFeedbackMessage('Feedback downloaded successfully!', 'success');
}

function showFeedbackMessage(message, type) {
    const formMessage = document.getElementById('feedbackMessage');
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

function validateFeedback() {
    var email = document.getElementById("feedbackEmail").value;
    var mobile = document.getElementById("feedbackMobile").value;

    if (email == "" || mobile == "") {
        alert("All fields required");
        return false;
    }

    if (mobile.length != 10) {
        alert("Invalid mobile number");
        return false;
    }

    return true;
}


function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

function simulateBackendConnectivity() {
    console.log('Connecting to backend server...');
    console.log('Connecting to backend server...');
    setTimeout(() => {
        console.log('Backend connection established');
        console.log('Products loaded:', products.length);
        console.log('Reviews loaded:', reviews.length);
        const savedCart = JSON.parse(localStorage.getItem('pixelwick_cart'));
        const savedContacts = JSON.parse(localStorage.getItem('pixelwick_contacts'));
        const savedOrders = JSON.parse(localStorage.getItem('pixelwick_orders'));
        if (savedCart) console.log('Cart data retrieved from storage');
        if (savedContacts) console.log('Contact submissions:', savedContacts.length);
        if (savedOrders) console.log('Previous orders:', savedOrders.length);
    }, 1000);
}

const additionalStyles = `
    .product-details {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #eee;
        font-size: 0.85rem;
    }
    
    .product-details p {
        margin: 5px 0;
    }
    
    .empty-cart {
        text-align: center;
        padding: 30px;
        color: var(--gray-color);
    }
    
    .feedback-form {
        max-width: 600px;
        margin: 0 auto;
        display: grid;
        gap: 20px;
    }
    
    .feedback-form .form-group {
        display: flex;
        flex-direction: column;
    }
    
    .feedback-form label {
        margin-bottom: 5px;
        font-weight: 500;
        color: var(--text-color);
    }
    
    .feedback-form input,
    .feedback-form select,
    .feedback-form textarea {
        padding: 12px;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .feedback-form input:focus,
    .feedback-form select:focus,
    .feedback-form textarea:focus {
        outline: none;
        border-color: var(--primary-color);
    }
    
    .feedback-form .form-message {
        margin-top: 10px;
        padding: 10px;
        border-radius: var(--border-radius);
        text-align: center;
        font-weight: 500;
    }
    
    .feedback-form .form-message.success {
        background-color: var(--success-color);
        color: white;
    }
    
    .feedback-form .form-message.error {
        background-color: var(--error-color);
        color: white;
    }
    
    .feedback-form .btn {
        margin-top: 10px;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

if (localStorage.getItem('pixelwick_cart')) {
    try {
        cart = JSON.parse(localStorage.getItem('pixelwick_cart'));
        updateCartCount();
    } catch (e) {
        console.error('Error loading cart from localStorage:', e);
        cart = [];
    }
}