let basketCount = document.getElementById("basket-count");
const cartList = document.querySelector(".list");
const total = document.querySelector(".total");

eventListner();

function eventListner() {
  window.addEventListener("DOMContentLoaded", () => {
    loadCart();
    window.addEventListener("click", removeProduct);
    window.addEventListener("click", option);
  });
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
  }
}
function loadCart() {
  let products = getProductFromStorage();
  let html = "";
  products.forEach((product) => {
    html += `
              <div class="cart-item" data-id = "${product.id}">
                    <div class="product-image">
                      <img class ="product-img" src="${product.img_Src}">
                    </div>
                    <div class="product-info">
                        <a href=""><p>${product.name}</p></a>                 
                        <div class = "price">
                          <p>
                            <small></small><strong>${product.price}</strong>                                       
                          </p>                                                             
                        </div>                                         
                        <div class = "remove-btn">
                          <button class="remove-btn" type="button" onclick="removeProduct(event)">Remove</button>                                      
                        </div>
                    </div>
                </div>
    `;
  });
  cartList.innerHTML = html;
  basketCount.textContent = products.length;
  total.textContent =`₹${new Intl.NumberFormat('en-IN').format(getTotalPrice())}`;
}
function getProductFromStorage() {
  return localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
}

/*-------remove product from cart--------------*/
function removeProduct(event) {
  let cartItems = getProductFromStorage();
  let cartItem;
  if (event.target.classList.contains("remove-btn")) {
    cartItem = event.target.parentElement.parentElement.parentElement;
    cartItem.remove();
  }
  let updatedCart = cartItems.filter((product) => {
    return product.id != parseInt(cartItem.dataset.id);
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  basketCount.textContent = updatedCart.length;
  total.textContent = '₹'+new Intl.NumberFormat('en-IN').format(getTotalPrice());
}
/*-------calculate total price--------------*/

function getTotalPrice() {
  let cartItems = getProductFromStorage();
  let total = 0;
  cartItems.forEach((product) => {
    total += parseInt(product.price.replace(/,/, "").replace(/₹/, ""));
  });
  return total;
}
