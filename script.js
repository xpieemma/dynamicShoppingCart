//DOM reference 
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');



let totalPrice =0;

// Function to update the total price
let updateTotalPrice = (amount) => {
  totalPrice += amount;
  totalPriceSpan.textContent = (totalPrice/100).toFixed(2);
};

// Function to remove an item
let  removeItem = (event) => {
  const item = event.target.closest('li');
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
};


addProductButton.addEventListener('click', () => {
  const name = productNameInput.value.trim();
  const price = Math.round (parseFloat(productPriceInput.value)*100);

  // Validation
  if (!name || isNaN(price) || price <= 0) {
    alert('Please enter a valid product name and price.');
    return;
  }

  const li = document.createElement('li');
  li.className = 'cart-item';

  // Store total price for THIS item (price × quantity)
  li.dataset.unitPrice = price;
  li.dataset.quantity = 1;
  li.dataset.price = price; // required for removeItem()

  const nameSpan = document.createElement('span');
  nameSpan.textContent = name;

  const priceSpan = document.createElement('span');
  priceSpan.textContent = `$${(price/100).toFixed(2)}`;

const calculationSpan = document.createElement('span');
calculationSpan.textContent = `1 × $${(price/100).toFixed(2)} = $${(price/100).toFixed(2)}`;


  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = 1;
  quantityInput.value = 1;
  quantityInput.style.width = '60px';

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';

  //update quantity
  quantityInput.addEventListener('change', () => {
    const oldQuantity = Number(li.dataset.quantity);
    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 1 || isNaN(newQuantity)) {
      quantityInput.value = oldQuantity;
      return;
    }

    const unitPrice = Number(li.dataset.unitPrice);

    const oldTotal = oldQuantity * unitPrice;
    const newTotal = newQuantity * unitPrice;

    // Update stored values
    li.dataset.quantity = newQuantity;
    li.dataset.price = newTotal;

    //Update the calculation for item
    calculationSpan.textContent = `${newQuantity} × $${(unitPrice/100).toFixed(2)} = $${(newTotal/100).toFixed(2)}`;

    // Update total price using required function
    updateTotalPrice(newTotal - oldTotal);
  });

 //remove item.
  removeButton.addEventListener('click', removeItem);

  // Assemble item
  li.append(nameSpan, priceSpan, calculationSpan, quantityInput, removeButton);
  cart.appendChild(li);

  // Initial price add
  updateTotalPrice(price);

  // Reset inputs
  productNameInput.value = '';
  productPriceInput.value = '';
});