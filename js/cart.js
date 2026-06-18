const cartContainer =
    document.getElementById("cart-items");

const totalElement =
    document.getElementById("total");

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

function renderCart() {

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.quantity;

        cartContainer.innerHTML += `
   <div class="cart-item">

    <img src="${item.image}">

    <div class="info">
      <h3>${item.title}</h3>
      <p>₹${item.price}</p>
    </div>

    <div class="qty">

      <button
      onclick="decreaseQty(${item.id})">
      -
      </button>

      <span>
      ${item.quantity}
      </span>

      <button
      onclick="increaseQty(${item.id})">
      +
      </button>

    </div>

    <button
    onclick="removeItem(${item.id})">
    Remove
    </button>
    

   </div>
  `;
    });

    totalElement.textContent =
        `Total: ₹${total.toFixed(2)}`;
}

function increaseQty(id){

 const item =
 cart.find(
  product => product.id === id
 );

 item.quantity++;

 saveCart();
}
function decreaseQty(id){

 const item =
 cart.find(
  product => product.id === id
 );

 if(item.quantity > 1){
  item.quantity--;
 }

 saveCart();
}
function removeItem(id){

 cart =
 cart.filter(
  item => item.id !== id
 );

 saveCart();
}
function saveCart(){

 localStorage.setItem(
  "cart",
  JSON.stringify(cart)
 );

 renderCart();
}

renderCart();