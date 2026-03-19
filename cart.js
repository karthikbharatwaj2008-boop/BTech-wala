// Cart Management System
class Cart {
    constructor() {
        this.items = this.loadCart();
    }

    // Load cart from localStorage
    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                ...product,
                quantity: product.quantity || 1
            });
        }

        this.saveCart();
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Get total price
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear entire cart
    clearCart() {
        this.items = [];
        this.saveCart();
    }

    // Get all items
    getItems() {
        return this.items;
    }
}

// Initialize cart globally
const cart = new Cart();

// Update cart badge in navbar
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const count = cart.getItemCount();
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
