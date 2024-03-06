// ************************LOAD HOMEPAGE CONTENT********************
let productsContainer = document.querySelector(".shop-content");

fetch('./products/products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(productsData => {
    productsData.forEach(product => {
      addProductToHTML(product);
    });
  })
  .catch(error => {
    console.error('Error fetching or processing data:', error);
  });

function addProductToHTML(product) {
  const productBox = document.createElement('div');
  productBox.classList.add('product-box');

  if (product.id) {
    productBox.dataset.productId = product.id;
  }

  if (product.image) {
    const productImg = document.createElement('img');
    productImg.src = product.image;
    productImg.alt = 'Product image';
    productImg.classList.add('product-img');
    productBox.appendChild(productImg);
  }
  
  if (product.category) {
    const showcaseCategory = document.createElement('a');
    showcaseCategory.href = '#';
    showcaseCategory.classList.add('showcase-category');
    showcaseCategory.textContent = product.category;
    productBox.appendChild(showcaseCategory);
  }

  if (product.title) {
    const productTitle = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = `product_details.html?productId=${product.id}`;
    titleLink.classList.add('showcase-title');
    titleLink.textContent = product.title;
    productTitle.appendChild(titleLink);
    productBox.appendChild(productTitle);
  }

  if (product.price && product.originalPrice) {
    const priceBox = document.createElement('div');
    priceBox.classList.add('price-box');

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `Ksh. ${product.price}`;

    const originalPrice = document.createElement('del');
    originalPrice.textContent = `Ksh. ${product.originalPrice}`;

    priceBox.appendChild(price);
    priceBox.appendChild(originalPrice);

    productBox.appendChild(priceBox);
  }

  productsContainer.appendChild(productBox);
}
