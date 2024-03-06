
// ***************** show and hide cart ************
let showCartButton = document.querySelector(".cart-icon-container");
let hideCartButton = document.querySelector("#close-cart");

let cart = document.querySelector(".cart");

showCartButton.addEventListener('click', showCart);
hideCartButton.addEventListener('click', hideCart);

function showCart(){
    cart.classList.add('active')
}
function hideCart(){
    cart.classList.remove('active')
}

document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cartContainer = document.querySelector(".cart");
    const closeCartButton = document.getElementById("close-cart");
    const cartContent = document.querySelector(".cart-content");
    const totalPriceDisplay = document.querySelector(".total-price");
    let cart = [];

    // Function to initialize the cart from local storage
    function initCart() {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            cart = JSON.parse(storedCart);
            displayCart();
        }
    }

    // Function to display the cart items
    function displayCart() {
        cartContent.innerHTML = "";
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-box");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="" class="cart-img" />
                <div class="detail-box">
                    <div class="cart-product-title">${item.title}</div>
                    <div class="cart-price">Ksh. ${item.price}</div>
                </div>
                <div class="cart-quantity">
                    <div class="changeQuantity">
                        <button class="decrease">-</button>
                        <span class="value">${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>
                    <div class="totalPrice">
                        <p>${item.price * item.quantity}</p>
                    </div>
                </div>`;

            // Event listeners for quantity buttons
            const decreaseButton = cartItem.querySelector('.decrease');
            const increaseButton = cartItem.querySelector('.increase');
            decreaseButton.addEventListener('click', () => updateQuantity(item.id, -1));
            increaseButton.addEventListener('click', () => updateQuantity(item.id, 1));

            cartContent.appendChild(cartItem);
        });

        updateTotal();
    }

    // Function to update the quantity of a cart item
    function updateQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        displayCart();
        saveCart();
    }

    // Function to update the total price display
    function updateTotal() {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalPriceDisplay.textContent = `Ksh. ${total.toFixed(2)}`;
    }

    // Function to save the cart to local storage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Event listener for cart icon click to toggle cart visibility
    // cartIcon.addEventListener("click", () => {
    //     cartContainer.classList.toggle("show-cart");
    // });

    // Event listener for close cart button
    // closeCartButton.addEventListener("click", () => {
    //     cartContainer.classList.remove("show-cart");
    // });

    // Function to add an item to the cart
    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        saveCart();
    }

    // Sample item object
    const item = {
        id: 1,
        title: "Amaya TK 03 wireless Earpods",
        price: 350,
        image: "img/amaya_pods.jpg"
    };

    // Example: Add item to cart
    addToCart(item);

    // Initialize the cart when the page loads
    initCart();
});
