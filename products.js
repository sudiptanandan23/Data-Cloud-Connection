const products = [

{ id:1, name:"Laptop", price:900 },
{ id:2, name:"Mobile", price:500 },
{ id:3, name:"Headphones", price:120 }

];


function loadProducts(){

const container = document.getElementById("productList");

products.forEach(product=>{

const div = document.createElement("div");

div.className="product";

div.innerHTML=`

<h3>${product.name}</h3>

<p>$${product.price}</p>

<button onclick="viewProduct(${product.id})">View</button>

<button onclick="addToCart(${product.id})">Add To Cart</button>

`;

container.appendChild(div);

});

}


/* PRODUCT VIEW */

function viewProduct(id){

const product = products.find(p=>p.id===id);

sendEvent("Product View","webInteraction",{
productId:product.id,
productName:product.name
});

}


/* ADD TO CART */

function addToCart(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push(id);

localStorage.setItem("cart",JSON.stringify(cart));

const product = products.find(p=>p.id===id);

sendEvent("Add To Cart","webInteraction",{
productId:product.id,
productName:product.name
});

}


/* DISPLAY CART */

function displayCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

const container = document.getElementById("cartItems");

cart.forEach(id=>{

const product = products.find(p=>p.id===id);

total += product.price;

container.innerHTML += `<p>${product.name} - $${product.price}</p>`;

});

document.getElementById("total").innerText="Total $" + total;

}


/* CHECKOUT */

function checkout(){

sendEvent("Checkout","webInteraction",{});

purchase();

}


/* PURCHASE */

function purchase(){

let email = localStorage.getItem("customerEmail");

sendEvent("Purchase","webInteraction",{
customerEmail:email
});

alert("Purchase completed!");

localStorage.removeItem("cart");

}
