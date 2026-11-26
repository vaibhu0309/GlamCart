//3rd copy

/* StyleCart - Simple JavaScript */

// Get cart products from browser
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(name, price,image) {
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
             image: image,//add
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


function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        localStorage.setItem("checkoutCart", JSON.stringify(cart));
        window.location.href = "checkout.html";
    }
    //alert("New checkout function is working!");
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



//changes
// Display checkout details
if (window.location.pathname.includes("checkout.html")) {

    let checkoutCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];

    let summary = document.getElementById("orderSummary");
    let totalElement = document.getElementById("grandTotal");

    let total = 0;

    checkoutCart.forEach(function(item) {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        summary.innerHTML += `
            <p>${item.name} - Rs. ${item.price} x ${item.quantity}</p>
        `;
    });

    totalElement.innerHTML = "Total Amount: Rs. " + total;
}



// Place customer order
function placeOrder(event) {
    event.preventDefault();

    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    let checkoutCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];

    if (checkoutCart.length === 0) {
        alert("Your cart is empty!");
        return false;
    }

    let total = 0;

    checkoutCart.forEach(function(item) {
        total += item.price * item.quantity;
    });

    let order = {
        customerName: name,
        phone: phone,
        address: address,
        products: checkoutCart,
        total: total,
        date: new Date().toLocaleString()
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Your order has been placed successfully!");

    localStorage.removeItem("checkoutCart");
    localStorage.removeItem("cart");
    cart = [];

    window.location.href = "orders.html";

    return false;
}




//after this code for myorder page
// Display previous orders
function displayOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let list = document.getElementById("ordersList");

    list.innerHTML = "";

    if (orders.length === 0) {
        list.innerHTML = "<h2>No previous orders found.</h2>";
        return;
    }

    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];

        let productDetails = "";

        for (let j = 0; j < order.products.length; j++) {
            let item = order.products[j];

            productDetails +=
                "<div class='ordered-product'>" +
                "<img src='" + (item.image || "images/no-image.jpg") + "'>" +
                "<div>" +
                "<h3>" + item.name + "</h3>" +
                "<p>Price: ₹" + item.price + "</p>" +
                "<p>Quantity: " + item.quantity + "</p>" +
                "</div></div>";
        }

        list.innerHTML +=
            "<div class='order-card'>" +
            "<div class='order-heading'>" +
            "<h2>Order #" + ("00" + (i + 1)) + "</h2>" +
            "<span>Order Placed</span>" +
            "</div>" +
            "<p class='order-date'>Date: " + order.date + "</p>" +
            "<h3>Product Details</h3>" +
            productDetails +
            "<h3 class='order-total'>Total Amount: ₹" + order.total + "</h3>" +
            "<p><b>Delivery Address:</b> " + order.address + "</p>" +
            "</div>";
    }
}

// Show orders when page opens
if (window.location.pathname.includes("orders.html")) {
    displayOrders();
}
