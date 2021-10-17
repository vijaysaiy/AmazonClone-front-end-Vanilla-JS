const productList = document.querySelector(".product-row");
let basketCount = document.getElementById("basket-count");
let cartItemID =getProductFromStorage().length;
basketCount.textContent = cartItemID;
let query = localStorage.getItem("query");

eventListner();
/*----------- event listners ------------*/
function eventListner() {
  window.addEventListener("DOMContentLoaded", () => {
    loadProducts(query);
  });
  productList.addEventListener("click", addToCart);
  window.addEventListener("click", option);
}
function option(event) {
  let query;
  if (event.target.classList.contains("mobiles")) {
    query = "mobiles";
    localStorage.setItem("query", query);
  } else if (event.target.classList.contains("accesories")) {
    query = "accesories";
    localStorage.setItem("query", query);
  } else if (event.target.classList.contains("earphones")) {
    query = "earphones";
    localStorage.setItem("query", query);
  } else {
    query = "products";
    localStorage.setItem("query", query);
  }
}
function loadProducts(query) { 
  fetch("json/products.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (query == "products") {
        for (i in data)
          data[i].forEach((product) => {
            html += htmlCode(product);
          });
      } else {
        data[query].forEach((product) => {
          html += htmlCode(product);
        });
      }
      productList.innerHTML = html;
    });
}
function htmlCode(product) {
  return `<div class="product">
          <img class ="product-img" src="${product.imgSrc}">
          <div class="product-info">
              <a href=""><p>${product.name}</p></a>                                                   
          </div>
          <div class = "price">
            <p>
            <small>₹</small><strong>${new Intl.NumberFormat('en-IN').format(product.price)}</strong>                                       
            </p>                                                             
          </div>
          <div class="price-strike">
            <p class ="strike"><strike>₹${new Intl.NumberFormat('en-IN').format(product.mrp)}</strike><p>
          </div>
          <button type="button" class="add-to-cart">
              <i class = "fas fa-shopping-cart"></i>
              Add to Cart
            </button>                              
      </div> 
  `;
}
/*-------- add to cart --------------*/
function addToCart(e) {
  if (e.target.classList.contains("add-to-cart")) {
    let product = e.target.parentElement;
    let productInfo = {
      id: cartItemID,
      img_Src: product.querySelector(".product-img").src,
      name: product.querySelector(".product-info").textContent,
      price: product.querySelector(".price").textContent,    
    };
    cartItemID++;
    basketCount.textContent++;
    saveProductInStorage(productInfo);    
  }
}
/*--------store in local storage--------------*/
function saveProductInStorage(item) {
  let products = getProductFromStorage();
  products.push(item);
  products = JSON.stringify(products);
  products = products.replace(/ /g, "");
  products = products.replace(/([a-z])([A-Z])|\\n/g, "$1 $2");
  localStorage.setItem("cartItems", products);
}
function getProductFromStorage() {
  return localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
}
