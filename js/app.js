const productContainer =
    document.querySelector("#products");

const searchInput =
    document.getElementById("search");

const categorySelect =
    document.getElementById("category");

let allProducts = [];
// console.log(allProducts);


async function getProducts() {

    try {

        const response =
            await fetch(
                "https://fakestoreapi.com/products"
            );

        const products =
            await response.json();

        // console.log(products);


        allProducts = products;

        displayProducts(products);

    } catch (error) {
        console.log(error);
    }

    // category
    const categoryResponse =
        await fetch(
            "https://fakestoreapi.com/products/categories"
        );

    const categories =
        await categoryResponse.json();

    categories.forEach(category => {
        categorySelect.innerHTML += `
        <option value="${category}">${category}</option> `;
    });

    categorySelect.addEventListener("change", e => {
        const value = e.target.value;
        if (value === "all") {
            displayProducts(allProducts);
            return;
        }
        const filtered = allProducts.filter(product =>
            product.category === value
        );
        // console.log(filtered);

        displayProducts(filtered);
    });
}

function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `
      <div class="card">
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p>₹${product.price}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add To Cart</button>
        <button class= "btn" onclick="showDetails(${product.id})">View Details</button>
      </div>
    `;
    });
};

function addToCart(id) {
    const product = allProducts.find(item => item.id === id);
    // console.log(product)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(`\nProduct added successfilly\n\n${product.title}\n\n₹${product.price}`);

};

function showDetails(id) {
    const product = allProducts.find(item => item.id === id);
    alert(`${product.title}
Price: ₹${product.price}
Category:${product.category}
Rating:${product.rating.rate} `);
}

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartCount = document.getElementById("cart-count")
    cartCount.textContent = cart.length;
}

updateCartCount();
getProducts();

searchInput.addEventListener("input", e => {
    const value =e.target.value.toLowerCase();

    const filtered =allProducts.filter(product => product.title.toLowerCase().includes(value));

    displayProducts(filtered);
});