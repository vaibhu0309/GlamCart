//3rd copy

/* StyleCart - Simple JavaScript */

// Get cart products from browser
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(name, price) {
    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity++;
            found = true;
        }
    }

    if (found === false) {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    alert(name + " added to cart!");
    displayCart();
}


// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Display cart products
function displayCart() {
    let items = document.getElementById("cart-items");
    let totalPrice = document.getElementById("cart-total");

    if (!items || !totalPrice) {
        return;
    }

    items.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        items.innerHTML = "<p>Your cart is empty.</p>";
        totalPrice.innerText = 0;
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        let price = product.price * product.quantity;

        total = total + price;

        items.innerHTML +=
            "<div class='cart-item'>" +
            "<h3>" + product.name + "</h3>" +
            "<p>Price: ₹" + product.price + "</p>" +
            "<p>Quantity: " + product.quantity + "</p>" +
            "<p>Total: ₹" + price + "</p>" +
            "<button onclick='decreaseQuantity(" + i + ")'>-</button> " +
            "<button onclick='increaseQuantity(" + i + ")'>+</button> " +
            "<button onclick='removeFromCart(" + i + ")'>Remove</button>" +
            "</div>";
    }

    totalPrice.innerText = total;
}


// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    displayCart();
}


// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    saveCart();
    displayCart();
}


// Remove product
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}


// Clear all products
function clearCart() {
    cart = [];
    saveCart();
    displayCart();
}


// Checkout demo
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for shopping with StyleCart!");
    }
}


function validateForm() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let message = document.getElementById("message");

    if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        phone.value.trim() === "" ||
        message.value.trim() === ""
    ) {
        alert("Please fill in all fields.");
        return false;
    }

    alert("Your form has been submitted!");

    name.value = "";
    email.value = "";
    phone.value = "";
    message.value = "";

    return false;
}

// Load cart when page opens
document.addEventListener("DOMContentLoaded", function() {
    displayCart();
});  

