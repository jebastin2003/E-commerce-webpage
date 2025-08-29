// Sample products (added more)
const products = [
  { id: 1, name: "Wireless Headphones", price: 1500, img: "https://via.placeholder.com/200?text=Headphones" },
  { id: 2, name: "Smart Watch", price: 2200, img: "https://via.placeholder.com/200?text=Watch" },
  { id: 3, name: "Gaming Mouse", price: 800, img: "https://via.placeholder.com/200?text=Mouse" },
  { id: 4, name: "Mechanical Keyboard", price: 2500, img: "https://via.placeholder.com/200?text=Keyboard" },
  { id: 5, name: "Bluetooth Speaker", price: 1800, img: "https://via.placeholder.com/200?text=Speaker" },
  { id: 6, name: "Laptop Bag", price: 1200, img: "https://via.placeholder.com/200?text=Bag" },
  { id: 7, name: "USB-C Cable", price: 300, img: "https://via.placeholder.com/200?text=Cable" },
  { id: 8, name: "Portable Charger", price: 900, img: "https://via.placeholder.com/200?text=Charger" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products
const productList = document.getElementById("product-list");
products.forEach(p => {
  let div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h4>${p.name}</h4>
    <p>₹${p.price}</p>
    <button onclick="addToCart(${p.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

// Update cart count
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

// Add product to cart
function addToCart(id) {
  let product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Render cart items
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    let li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} 
      <button onclick="removeItem(${index})">❌</button>`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Clear cart
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Toggle cart visibility
function toggleCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.style.display = cartDiv.style.display === "block" ? "none" : "block";
}

// Show order form
function showOrderForm() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  document.getElementById("order-form").style.display = "block";
}

// Hide order form
function hideOrderForm() {
  document.getElementById("order-form").style.display = "none";
}

// Place order
function placeOrder() {
  const date = document.getElementById("delivery-date").value;
  const address = document.getElementById("delivery-address").value;

  if (!date || !address.trim()) {
    alert("Please enter both date and address!");
    return;
  }

  // Clear cart
  clearCart();
  hideOrderForm();

  // Show notification
  const notification = document.getElementById("notification");
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

// Initialize
renderCart();
updateCartCount();
