const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");
let totalPrice = 0;
let productList = [];
// add
// Name  |    unit price |    Quantity * unit Price |      Quantity  |      removeButton
// add product








addProductButton.addEventListener("click", function () {
  // productList=[];
  let productName = productNameInput.value;
  let productPrice = Number(productPriceInput.value);
  if (productName === "" || productPrice <= 0 || !productPrice) {
    alert("Invalid Input");
    return;
  }
  let product = {
    name: productName,
    price: productPrice,
    quantity: 1
  };
  productList.push(product);
  updateTotalPrice(productPrice);
  console.log(productList);
  cart.textContent = "";
  
  for (let productItem of productList) {
    let listItem = document.createElement("li");
    // listItem.dataset.price = `${productItem.price}`;
    listItem.dataset.price =  productItem.price * productItem.quantity;

    listItem.classList.add("cart-item");
    // children of list-item
    let productNameSpan = document.createElement("span");
    productNameSpan.textContent = productItem.name;
    let productPriceSpan = document.createElement("span");
    productPriceSpan.textContent = "$" + productItem.price;
   
let quantitySpan = document.createElement('span');
quantitySpan.textContent = ` ${productItem.quantity} × $${productItem.price} = $${(productItem.quantity * productItem.price).toFixed(2)} `;

let increaseBtn = document.createElement('button');
increaseBtn.textContent="+";

let decreaseBtn = document.createElement("button");
decreaseBtn.textContent = "-";

increaseBtn.addEventListener("click", () => {
    productItem.quantity++;
    updateTotalPrice(productItem.price);
    addProductButton.click();

});

decreaseBtn.addEventListener("click", () => {
if (productItem.quantity > 1){
    productItem--;
    updateTotalPrice(-productItem.price);
    addProductButton.click();
}
});
 

let removeItemButton = document.createElement("button");
    removeItemButton.textContent = "remove";


listItem.append(productNameSpan, productPriceSpan, increaseBtn, decreaseBtn, removeItemButton);
    cart.appendChild(listItem);
    removeItemButton.addEventListener("click", removeItem);
  }
});
// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}
// Function to remove an item
function removeItem(event) {
  const item = event.target.closest("li");
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
}
