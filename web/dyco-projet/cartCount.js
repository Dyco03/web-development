document.addEventListener("DOMContentLoaded", function() {
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').innerText = cartCount;
    }

    updateCartCount();
});
