/* PRODUCTS (No Database Needed) */

const products = [

{
id:1,
name:"Laptop",
price:800,
image:"https://via.placeholder.com/200"
},

{
id:2,
name:"Phone",
price:500,
image:"https://via.placeholder.com/200"
},

{
id:3,
name:"Headphones",
price:120,
image:"https://via.placeholder.com/200"
}

];


/* LOAD PRODUCTS */

const productList = document.getElementById("productList");

if(productList){

products.forEach(product=>{

const div = document.createElement("div");

div.classList.add("product");

div.innerHTML = `

<img src="${product.image}" width="150">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<button onclick="addToCart(${product.id})">
Add to Cart
</button>

`;

productList.appendChild(div);

});

}


/* ADD TO CART */

function addToCart(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push(id);

localStorage.setItem("cart",JSON.stringify(cart));

alert("Product added to cart!");

}


/* DISPLAY CART */

function displayCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");

let total = 0;

cartItems.innerHTML="";

cart.forEach(id=>{

const product = products.find(p=>p.id===id);

total += product.price;

const div = document.createElement("div");

div.innerHTML = `

<p>${product.name} - $${product.price}</p>

`;

cartItems.appendChild(div);

});

document.getElementById("totalPrice").innerText =
"Total: $" + total;

}
