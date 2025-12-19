let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* LOAD PRODUCTS ON HOME PAGE */
if (document.getElementById("product-list")) {
  fetch("./products.json")
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(p => {
        html += `
          <div class="product">
            <img src="${p.image}">
            <h2>${p.name}</h2>
            <p>₹${p.price}</p>
            <a href="product.html?id=${p.id}">View Details</a>
          </div>
        `;
      });
      document.getElementById("product-list").innerHTML = html;
      updateCartCount();
    });
}

/* PRODUCT DETAILS PAGE */
if (document.getElementById("product-details")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch("./products.json")
    .then(res => res.json())
    .then(data => {
      const p = data.find(x => x.id == id);
      document.getElementById("product-details").innerHTML = `
        <img src="${p.image}">
        <h2>${p.name}</h2>
        <p>${p.description}</p>
        <h3>₹${p.price}</h3>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
    });
}

/* ADD TO CART */
function addToCart(id) {
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
  updateCartCount();
}

/* UPDATE CART COUNT */
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.length;
}

/* CART PAGE */
if (document.getElementById("cart-items")) {
  fetch("./products.json")
    .then(res => res.json())
    .then(data => {
      let html = "";
      let total = 0;

      cart.forEach(id => {
        const p = data.find(x => x.id == id);
        html += `
          <div>
            <img src="${p.image}" width="80">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
          </div>
        `;
        total += p.price;
      });

      html += `<h2>Total: ₹${total}</h2>`;
      document.getElementById("cart-items").innerHTML = html;
    });
}

