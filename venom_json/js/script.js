


// *********************  FILTER  *****************

const filterButtons = document.querySelectorAll('.filter-item');

filterButtons.forEach(button => {
  button.addEventListener('click', handleFilterClick);
});

function handleFilterClick(event) {
  const selectedFilter = event.target.dataset.filter;
  const postBoxes = document.querySelectorAll('.post-box');

  // Remove active class from all buttons
  filterButtons.forEach(button => button.classList.remove('active-filter'));

  // Add active class to the clicked button
  event.target.classList.add('active-filter');

//   postBoxes.forEach(postBox => {
//     const postCategories = postBox.classList; 
    
//     postBox.style.display = selectedFilter === 'all' || postCategories.contains(selectedFilter) ? 'block' : 'none';
//   });


  for(let k = 0; k < postBoxes.length; k++){
    let postCategories = postBoxes[k].classList;

    if(selectedFilter == 'all' || postCategories.contains(selectedFilter)){
        postBoxes[k].style.display = 'block';
    }
    else {
         postBoxes[k].style.display = 'none';
    }
  }
}

// Trigger initial filtering (optional)
// const activeFilter = document.querySelector('.active-filter');
// activeFilter.addEventListener('click', handleFilterClick);


// ************************   MAIN JS  *****************************

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');


// ***************** show and hide cart ************
cartIcon.addEventListener('click', showCart);
closeCart.addEventListener('click', hideCart);

function showCart(){
    cart.classList.add('active')
}
function hideCart(){
    cart.classList.remove('active')
}


// **************** add and remove items to and from the cart **********
// Check if document is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Store button references
  const addToCartButtons = Array.from(document.querySelectorAll(".add-cart"));
  const removeFromCartButtons = Array.from(document.querySelectorAll(".cart-remove"));

  // Add event listeners
  for(let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener("click", addToCart);
  }
  for(let i = 0; i < removeFromCartButtons.length; i++){
    removeFromCartButtons[i].addEventListener("click", removeFromCart);
  }

// Function to add item to cart
function addToCart(event) {
    const button = event.target; // Get the clicked button
    const productBox = button.closest('.product-box'); // Find the closest product box
    const productId = productBox.getAttribute('data-productId'); // Get product ID
    const productName = productBox.getAttribute('data-productName'); // Get product name
    const priceString = productBox.getAttribute('data-productPrice'); // Get product price string
    const price = parseFloat(priceString.replace(/[^\d.]/g, '')); // Convert price string to number
    const productImage = productBox.getAttribute('data-productImage'); // Get product image source
    
    
    // Create cart item object
   const cartItem = {
        id: productId,
        name: productName,
        price: price,
        quantity: 1, // Assuming initial quantity is 1
        imageSrc: productImage // Include image source
    };


// ****************************************************
 // Create the cart item HTML structure
    const cartContent = document.querySelector('.cart-content');
    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');

    const cartImg = document.createElement('img');
    cartImg.src = cartItem.imageSrc;
    cartImg.alt = 'Product Image';
    cartImg.classList.add('cart-img');
    cartBox.appendChild(cartImg);

    const detailBox = document.createElement('div');
    detailBox.classList.add('detail-box');

    const cartProductTitle = document.createElement('div');
    cartProductTitle.classList.add('cart-product-title');
    cartProductTitle.textContent = cartItem.name;
    detailBox.appendChild(cartProductTitle);

    const cartPrice = document.createElement('div');
    cartPrice.classList.add('cart-price');
    cartPrice.textContent = 'Ksh. ' + cartItem.price.toFixed(2); // Format price
    detailBox.appendChild(cartPrice);

    const cartQuantity = document.createElement('input');
    cartQuantity.type = 'number';
    cartQuantity.value = cartItem.quantity;
    cartQuantity.classList.add('cart-quantity');
    detailBox.appendChild(cartQuantity);

    cartBox.appendChild(detailBox);

    // Remove from cart button
    const removeButton = document.createElement('i');
    removeButton.classList.add('bx', 'bxs-trash-alt', 'cart-remove');
    cartBox.appendChild(removeButton);

    cartContent.appendChild(cartBox);

    console.log("Item added to cart:", cartItem);


    // *******************************************************************
  }

// //   Function to remove item from cart
  function removeFromCart(event) {

  }
})