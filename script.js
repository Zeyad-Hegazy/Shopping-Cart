"use strict";

const productsContainer = document.querySelector(".all-cards");
const cartBtn = document.querySelector(".cart-btn");
const indicator = document.querySelector(".length");
const cartDropdown = document.querySelector(".cart-dropdown");
const overlay = document.querySelector(".overlay");
const view = document.querySelector(".view-product");
const imgView = document.querySelector(".img-view img");
const nameView = document.querySelector(".name-view");
const priceView = document.querySelector(".price-view");
const closeBtn = document.querySelector(".btn-close");
const closeIcon = document.querySelector(".close-icon");

const productLaptop = {
	product_id: 0,
	product_name: "HP Laptop",
	product_price: "$600",
	product_image: "laptop",
	added_to_cart: false,
};

const productAlarm = {
	product_id: 1,
	product_name: "Alarm",
	product_price: "$15",
	product_image: "alarm",
	added_to_cart: false,
};

const productShirts = {
	product_id: 2,
	product_name: "10 Shirts",
	product_price: "$35",
	product_image: "shirts",
	added_to_cart: false,
};

const productAirpods = {
	product_id: 3,
	product_name: "Airpods",
	product_price: "$100",
	product_image: "airpods",
	added_to_cart: false,
};

const productGlasses = {
	product_id: 4,
	product_name: "Glasses",
	product_price: "$20",
	product_image: "glasses",
	added_to_cart: false,
};

const productNike = {
	product_id: 5,
	product_name: "Nike Shoes",
	product_price: "$40",
	product_image: "shoes",
	added_to_cart: false,
};

const products = [
	productLaptop,
	productAlarm,
	productShirts,
	productAirpods,
	productGlasses,
	productNike,
];

function renderProducts() {
	products.forEach((product) => {
		productsContainer.innerHTML += `
  <div class="card">
			<div class="img-contanier" onclick="openViewProduct(${product.product_id})">
				<img src="assets/${product.product_image}.png" alt="${product.product_image}" />
			</div>
			<div class="details">
				<div class="contanier">
					<h2 class="name">product name</h2>
					<p class="name-of-product">${product.product_name}</p>
				</div>
				<div class="contanier">
					<h2 class="name">price</h2>
					<p class="name-of-product">${product.product_price}</p>
				</div>
			</div>
			<div class="action-btns">
				<button class="btn-remove hidden" onclick="removeProduct(${product.product_id})">Remove</button>
				<button class="btn-add-cart" onclick="addToCart(${product.product_id})">add to cart</button>
				<button class="btn-view" onclick="openViewProduct(${product.product_id})">quick view</button>
			</div>
  </div>`;
	});
}
renderProducts();

const addBtn = [...document.querySelectorAll(".btn-add-cart")];
const removeBtn = [...document.querySelectorAll(".btn-remove")];

let cart = JSON.parse(localStorage.getItem("CART")) || [];

updateCart();

function addToCart(id) {
	if (cart.some((product) => product.product_id === id)) {
		alert("Product already in cart ⛔");
	} else {
		const item = products.find((product) => product.product_id === id);

		cart.push(item);

		cart.forEach((product) => (product.added_to_cart = true));
	}

	addBtn[id].classList.add("hidden");
	removeBtn[id].classList.remove("hidden");

	if (document.querySelector(".btn-add-cart-view")) {
		document.querySelector(".btn-add-cart-view").classList.add("hidden");
		document.querySelector(".btn-remove-view").classList.remove("hidden");
	}

	updateCart();
}

cart.forEach((btn) => {
	addBtn[btn.product_id].classList.add("hidden");
	removeBtn[btn.product_id].classList.remove("hidden");
});

function updateCart() {
	renderCartProducts();

	updataIndicator();

	localStorage.setItem("CART", JSON.stringify(cart));
}

function updataIndicator() {
	if (cart.length > 0) {
		indicator.classList.remove("hidden");
		indicator.textContent = `${cart.length}`;
	}
	if (cart.length === 0) {
		indicator.classList.add("hidden");
		cartDropdown.style.textAlign = "center";
		cartDropdown.style.fontSize = "2rem";
		cartDropdown.style.color = "#c13f3f";
		cartDropdown.innerHTML = "Cart is empty";
	}
}

cartBtn.addEventListener("click", () => {
	cartDropdown.classList.toggle("cart-open");
	if (cartDropdown.innerHTML === "Cart is empty") {
		cartDropdown.classList.remove("cart-open");
	}
});

window.addEventListener("click", (e) => {
	if (!e.target.closest(".product-in-cart") && !e.target.closest(".cart-btn")) {
		cartDropdown.classList.remove("cart-open");
	}
});

function renderCartProducts() {
	cartDropdown.innerHTML = "";
	cart.forEach((product) => {
		cartDropdown.innerHTML += `
					<div class="product-in-cart">
							<div class="img-in-cart">
								<img src="assets/${product.product_image}.png" alt="${product.product_image}" />
							</div>
							<div class="details-cart">
								<div class="contanier">
									<p class="name-of-product">${product.product_name}</p>
									<p class="name-of-product">${product.product_price}</p>
								</div>
								<div class="action-btns-in-cart">
									<button class="btn-remove-in-cart" onclick="removeProduct(${product.product_id})">Remove</button>
									<button class="btn-view-in-cart" onclick="openViewProduct(${product.product_id})">quick view</button>
								</div>
							</div>
					</div>
		`;
	});
}

function removeProduct(id) {
	cart = cart.filter((product) => product.product_id !== id);

	addBtn[id].classList.remove("hidden");
	removeBtn[id].classList.add("hidden");

	updataIndicator();

	if (document.querySelector(".btn-add-cart-view")) {
		document.querySelector(".btn-add-cart-view").classList.remove("hidden");
		document.querySelector(".btn-remove-view").classList.add("hidden");
	}

	updateCart();
}

function openViewProduct(id) {
	overlay.classList.remove("hidden");
	view.classList.remove("hidden");

	let viewportHeight = window.pageYOffset;
	view.style.top = `${viewportHeight + 100}px`;

	view.innerHTML = `
				<div class="close-icon" onclick="closeViewProduct()">
					<img src="assets/close-icon.png" alt="close" onclick="closeViewProduct()" />
				</div>	

				<div class="img-view">
					<img src="assets/${products[id].product_image}.png" alt="${products[id].product_image}" />
				</div>

				<div class="details-view">
					<div class="contanier">
						<h2 class="name">product name</h2>
						<p class="name-of-product name-view">${products[id].product_name}</p>
					</div>
					<div class="contanier">
						<h2 class="name">price</h2>
						<p class="name-of-product price-view">${products[id].product_price}</p>
					</div>
					<div class="action-btns">
						<button class="btn-remove-view hidden" onclick="removeProduct(${products[id].product_id})">Remove</button>
						<button class="btn-add-cart-view" onclick="addToCart(${products[id].product_id})">add to cart</button>
						<button class="btn-close" onclick="closeViewProduct()">close</button>
					</div>
				</div>
	`;

	if (cart.find((product) => product.product_id === id)) {
		document.querySelector(".btn-add-cart-view").classList.add("hidden");
		document.querySelector(".btn-remove-view").classList.remove("hidden");
	} else {
		document.querySelector(".btn-add-cart-view").classList.remove("hidden");
		document.querySelector(".btn-remove-view").classList.add("hidden");
	}

	document.body.style.overflow = "hidden";
}

function closeViewProduct() {
	overlay.classList.add("hidden");
	view.classList.add("hidden");
	document.body.style.overflowY = "scroll";
}

overlay.addEventListener("click", closeViewProduct);
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") closeViewProduct();
});
