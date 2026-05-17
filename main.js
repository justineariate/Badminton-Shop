// Menu Data
const menuItems = [
    {
        id: 1,
        name: "Arc Saber",
        price: 2000,
        category: "racket",
        description: "Smash as you can",
        image: 'images/racket1.jpg',
        rating: 4.8


    },
    {
        id: 2,
        name: "Ling mei",
        price: 12.99,
        category: "shuttlecock",
        description: "Fly with me",
        image: 'images/shuttle1.jpg',
        rating: 4.9
    },
    {
        id: 3,
        name: "Yonex",
        price: 11.99,
        category: "shoes",
        description: "Put on to prevent injury",
        image: 'images/shoes1.jpg',
        rating: 4.7
    },
    {
        id: 4,
        name: "Socks Lining",
        price: 10.99,
        category: "accessories",
        description: "Comfortable with all items",
        image: 'images/socks1.jpg',
        rating: 4.6
    }
];

let cart = [];
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close-modal');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.querySelector('.cart-count');
const menuGrid = document.getElementById('menuGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
const proceedToCheckoutBtn = document.getElementById('proceedToCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const orderConfirmation = document.getElementById('orderConfirmation');
const backToCartBtn = document.getElementById('backToCart');
const placeOrderBtn = document.getElementById('placeOrder');
const newOrderBtn = document.getElementById('newOrder');
const orderSummary = document.getElementById('orderSummary');

// Initialize the menu
// Category button click
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {

        // Remove active class from all buttons
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        button.classList.add('active');

        // Get category value
        const category = button.getAttribute('data-category');

        // Filter items
        filterMenuItems(category);
    });
});

function displayMenuItems(items) {
    menuGrid.innerHTML = '';

    items.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.setAttribute('data-category', item.category);

        //         menuItemElement.innerHTML = `
        //                     // <div class="item-image" style="background-image: url('${item.image}')"></div>
        //                     <div class="item-image">
        // <img src="${item.image}" alt="${item.name}">
        // </div>
        //                     <div class="item-content">
        //                         <div class="item-header">
        //                             <h3 class="item-title">${item.name}</h3>
        //                             <div class="item-price">$${item.price.toFixed(2)}</div>
        //                         </div>
        //                         <p class="item-description">${item.description}</p>
        //                         <div class="item-footer">
        //                             <div class="rating">
        //                                 ${generateStarRating(item.rating)}
        //                                 <span>${item.rating}</span>
        //                             </div>
        //                             <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        //                         </div>
        //                     </div>
        //                 `;
        menuItemElement.innerHTML = `
    <div class="item-image">
        <img src="${item.image}" alt="${item.name}">
    </div>

    <div class="item-content">
        <div class="item-header">
            <h3 class="item-title">${item.name}</h3>
            <div class="item-price">$${item.price.toFixed(2)}</div>
        </div>

        <p class="item-description">${item.description}</p>

        <div class="item-footer">
            <div class="rating">
                ${generateStarRating(item.rating)}
                <span>${item.rating}</span>
            </div>

            <button class="add-to-cart" data-id="${item.id}">
                Add to Cart
            </button>
        </div>
    </div>
`;

        menuGrid.appendChild(menuItemElement);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            addToCart(itemId);
        });
    });

}
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Filter menu items
function filterMenuItems(category) {
    if (category === 'all') {
        displayMenuItems(menuItems);
    } else {
        const filteredItems = menuItems.filter(item => item.category === category);
        displayMenuItems(filteredItems);
    }
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item, quantity: 1
        });
    }
    updateCart();


    const addButton = document.querySelector(`.add-to-cart[data-id="${itemId}"]`);
    const originalText = addButton.textContent;
    addButton.textContent = 'Added!';
    addButton.style.backgroundColor = '#4ecdc4';

    setTimeout(() => {
        addButton.textContent = originalText;
        addButton.style.backgroundColor = '';

    }, 1000);

}

// CART DISPLAY
function updateCart() {
    // Update Cart Count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Update Cart Items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        proceedToCheckoutBtn.style.display = 'none';
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            cartItemElement.innerHTML = `
                        <div class="cart-item-info">
                            <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                            <div>
                                <div class="cart-item-name">${item.name}</div>
                                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            </div>
                        </div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                        </div>
                    `;

            cartItemsContainer.appendChild(cartItemElement);
        });

        // Add event listeners to quantity buttons
        document.querySelectorAll('.increase-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                increaseQuantity(itemId);
            });
        });

        document.querySelectorAll('.decrease-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                decreaseQuantity(itemId);
            });
        });

        proceedToCheckoutBtn.style.display = 'block';
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Increase item quantity
function increaseQuantity(itemId) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

// Decrease item quantity
function decreaseQuantity(itemId) {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCart();
    }
}

// Show checkout form
function showCheckoutForm() {
    cartItemsContainer.style.display = 'none';
    proceedToCheckoutBtn.style.display = 'none';
    checkoutForm.classList.add('active');
}

// Show cart items
function showCartItems() {
    cartItemsContainer.style.display = 'block';
    proceedToCheckoutBtn.style.display = 'block';
    checkoutForm.classList.remove('active');
    orderConfirmation.classList.remove('active');
}

// Show order confirmation
function showOrderConfirmation() {
    cartItemsContainer.style.display = 'none';
    proceedToCheckoutBtn.style.display = 'none';
    checkoutForm.classList.remove('active');
    orderConfirmation.classList.add('active');

    // Generate order summary
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderNumber = Math.floor(Math.random() * 1000000);

    let summaryHTML = `
                <h4>Order #${orderNumber}</h4>
                <div class="order-items">
            `;

    cart.forEach(item => {
        summaryHTML += `
                    <div class="order-item">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `;
    });

    summaryHTML += `
                </div>
                <div class="order-total">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            `;

    orderSummary.innerHTML = summaryHTML;
}

// Reset cart and start new order
function resetCart() {
    cart = [];
    updateCart();
    showCartItems();

    // Reset form fields
    document.getElementById('customerName').value = '';
    document.getElementById('customerEmail').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('paymentMethod').value = '';
    document.getElementById('deliveryTime').value = '';
}

// Event listeners
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

cartIcon.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

proceedToCheckoutBtn.addEventListener('click', showCheckoutForm);

backToCartBtn.addEventListener('click', showCartItems);

placeOrderBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Simple form validation
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const payment = document.getElementById('paymentMethod').value;
    const delivery = document.getElementById('deliveryTime').value;

    if (!name || !email || !phone || !address || !payment || !delivery) {
        alert('Please fill in all fields before placing your order.');
        return;
    }

    // Show confirmation
    showOrderConfirmation();
});

newOrderBtn.addEventListener('click', () => {
    resetCart();
    cartModal.style.display = 'none';
});


// initializeMenu();
displayMenuItems(menuItems);

