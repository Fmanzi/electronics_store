document.addEventListener("DOMContentLoaded", function () {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // Get product ID from URL parameter
    var productId = getUrlParameter("productId");

    // Fetch product details based on product ID
    fetch("./products/products.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((productsData) => {
            // Find the product with the matching ID
            var product = productsData.find(
                (product) => product.id == productId
            );
            if (product) {
                fillProductDetails(product);
                // Get related products based on some criteria (e.g., products from the same category)
                var relatedProducts = productsData
                    .filter(
                        (p) => p.category === product.category && p.id !== product.id
                    )
                    .slice(0, 8); // Limit to 8 related products
                displayRelatedProducts(relatedProducts);
            } else {
                console.error("Product not found");
            }
        })
        .catch((error) => {
            console.error("Error fetching or processing data:", error);
        });

    // Function to fill product details into the HTML
    function fillProductDetails(product) {
        const detailContainer = document.querySelector(".detail");
        if (!detailContainer) return;

        detailContainer.innerHTML = `
            <div class="image">
                <img src="${product.image}" alt="${product.title}" />
                <div class="otherImages">
                    ${product.otherImages.map(image => `<img src="${image}" alt="${product.title}" />`).join('')}
                </div>
            </div>
            <div class="product-info">
                <h1 class="product-title">${product.title}</h1>
                <p class="product-description">${product.description}</p>
                <p class="product-price">Ksh. ${product.price}</p>
                <div class="color-selector">
                    <label for="color">Choose a Color:</label>
                    <ul class="color-options">
                        ${product.colors.map(color => `<li class="color-option" data-color="${color}">${color}</li>`).join('')}
                    </ul>
                </div>
                <div class="size-selector">
                    <label for="size">Choose a Size:</label>
                    <ul class="size-options">
                        ${product.sizes.map(size => `<li class="size-option">${size}</li>`).join('')}
                    </ul>
                </div>
                <div class="quantity-selector">
                    <label for="quantity">Quantity:</label>
                    <div class="quantity-buttons">
                        <button class="decrease">-</button>
                        <input type="text" name="quantity" id="quantity" value="1" />
                        <button class="increase">+</button>
                    </div>
                </div>
                <div class="checkout-buttons">
                    <button class="buy-now">Buy Now</button>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>`;
        
        // Event listeners for color options
        const colorOptions = detailContainer.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });

        // Event listeners for size options
        const sizeOptions = detailContainer.querySelectorAll('.size-option');
        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });

        // Event listener for quantity buttons
        const quantityInput = detailContainer.querySelector('#quantity');
        const decreaseButton = detailContainer.querySelector('.decrease');
        const increaseButton = detailContainer.querySelector('.increase');
        
        decreaseButton.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        increaseButton.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        quantityInput.addEventListener('input', () => {
            if (quantityInput.value < 1 || isNaN(quantityInput.value)) {
                quantityInput.value = 1;
            }
        });

        // Event listener for add to cart button
        const addToCartButton = detailContainer.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            // Add item to cart logic
            // You can implement this according to your cart functionality
        });

        // Event listener for buy now button
        const buyNowButton = detailContainer.querySelector('.buy-now');
        buyNowButton.addEventListener('click', () => {
            // Add item to cart and redirect to checkout page
            // You can implement this according to your cart and checkout functionality
            window.location.href = 'check3.html'; // Redirect to checkout page
        });
    }

    // Function to display related products
    function displayRelatedProducts(relatedProducts) {
        var relatedProductsContainer = document.querySelector(".related-products .products");
        if (!relatedProductsContainer) return;

        // Clear existing content in case this function is called multiple times
        relatedProductsContainer.innerHTML = "";

        // Create a container for related products
        var container = document.createElement("div");
        container.classList.add("shop-content", "container");

        relatedProducts.forEach((product) => {
            var productBox = document.createElement("div");
            productBox.classList.add("product-box");
            productBox.innerHTML = `
                <img src="${product.image || 'placeholder.jpg'}" alt="${product.title || 'Product Image'}" class="product-img" />
                <a href="#" class="showcase-category">${product.category || 'Category'}</a>
                <h3 class="showcase-title"><a href="product_details.html?productId=${product.id}">${product.title || 'Product Title'}</a></h3>
                <div class="price-box">
                    <p class="price">Ksh. ${product.price || ''}</p>
                    ${product.originalPrice ? `<del>Ksh. ${product.originalPrice}</del>` : ''}
                </div>
                <i class="bx bx-shopping-bag add-cart"></i>`;
            container.appendChild(productBox);
        });

        // Append the container with related products to the relatedProductsContainer
        relatedProductsContainer.appendChild(container);
    }


    // const cartIcon = document.getElementById("cart-icon");
    // const cartCounter = document.getElementById("cart-counter");
    // const cartContainer = document.querySelector(".cart");
    // const closeCartButton = document.getElementById("close-cart");
    // const cartContent = document.querySelector(".cart-content");
    // const totalPriceDisplay = document.querySelector(".total-price");
    // let cart = [];

    // // Function to initialize the cart from local storage
    // function initCart() {
    //     const storedCart = localStorage.getItem("cart");
    //     if (storedCart) {
    //         cart = JSON.parse(storedCart);
    //         updateCartCounter();
    //     }
    // }

    // // Function to display the cart items
    // function displayCart() {
    //     cartContent.innerHTML = "";
    //     cart.forEach(item => {
    //         const cartItem = document.createElement("div");
    //         cartItem.classList.add("cart-box");

    //         cartItem.innerHTML = `
    //             <img src="${item.image}" alt="" class="cart-img" />
    //             <div class="detail-box">
    //                 <div class="cart-product-title">${item.title}</div>
    //                 <div class="cart-price">Ksh. ${item.price}</div>
    //             </div>
    //             <div class="cart-quantity">
    //                 <div class="changeQuantity">
    //                     <button class="decrease">-</button>
    //                     <span class="value">${item.quantity}</span>
    //                     <button class="increase">+</button>
    //                 </div>
    //                 <div class="totalPrice">
    //                     <p>${item.price * item.quantity}</p>
    //                 </div>
    //             </div>`;

    //         // Event listeners for quantity buttons
    //         const decreaseButton = cartItem.querySelector('.decrease');
    //         const increaseButton = cartItem.querySelector('.increase');
    //         decreaseButton.addEventListener('click', () => updateQuantity(item.id, -1));
    //         increaseButton.addEventListener('click', () => updateQuantity(item.id, 1));

    //         cartContent.appendChild(cartItem);
    //     });

    //     updateTotal();
    // }

    // // Function to update the quantity of a cart item
    // function updateQuantity(id, change) {
    //     const item = cart.find(item => item.id === id);
    //     item.quantity += change;
    //     if (item.quantity <= 0) {
    //         cart = cart.filter(item => item.id !== id);
    //     }
    //     displayCart();
    //     saveCart();
    //     updateCartCounter();
    // }

    // // Function to update the total price display
    // function updateTotal() {
    //     const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    //     totalPriceDisplay.textContent = `Ksh. ${total.toFixed(2)}`;
    // }

    // // Function to save the cart to local storage
    // function saveCart() {
    //     localStorage.setItem("cart", JSON.stringify(cart));
    // }

    // // Function to update the cart counter
    // function updateCartCounter() {
    //     const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    //     cartCounter.textContent = totalCount;
    // }

    // // Event listener for cart icon click to toggle cart visibility
    // cartIcon.addEventListener("click", () => {
    //     cartContainer.classList.toggle("show-cart");
    // });

    // // Event listener for close cart button
    // closeCartButton.addEventListener("click", () => {
    //     cartContainer.classList.remove("show-cart");
    // });

    // // Function to add an item to the cart
    // function addToCart(item) {
    //     const existingItem = cart.find(cartItem => cartItem.id === item.id);
    //     if (existingItem) {
    //         existingItem.quantity++;
    //     } else {
    //         cart.push({ ...item, quantity: 1 });
    //     }
    //     saveCart();
    //     updateCartCounter();
    // }

    // // Sample item object (you can replace this with your actual item data)
    // const item = {
    //     id: 1,
    //     title: "TK 03 wireless Earpods",
    //     price: 350,
    //     image: "img/amaya_pods.jpg"
    // };

    // // Example: Add item to cart (you can call this function when user clicks "Add to Cart" button)
    // addToCart(item);

    // // Initialize the cart when the page loads
    // initCart();
});



