const homeList = document.querySelector(".home-row");
let basketCount = document.getElementById("basket-count");
basketCount.textContent=getProductFromStorage().length;

eventListner();

function eventListner() {
  window.addEventListener("DOMContentLoaded", () => {
    loadCards();
  });
  window.addEventListener('click',option)  
}
function option(event) {
  let query;
  if(event.target.classList.contains('mobiles')){
    query = 'mobiles';
    localStorage.setItem('query', query);
  }
  else if(event.target.classList.contains('accesories')){
    query = 'accesories';
    localStorage.setItem('query', query);
  }
  else if(event.target.classList.contains('earphones')){
    query = 'earphones';
    localStorage.setItem('query', query);  
  }
  else {
    query = 'products';
  }  
}
function loadCards() {
  fetch("json/home.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((home) => {
        html += `
            <div class="product">
                    <div class="product-info">
                        <h2>${home.description}</h2>
                    </div>
                    <div class= "img">
                    <a href = "products.html"><img src=${home.imgSrc} alt=""></a>
                    </div>
                </div>
            `;
      });
      homeList.innerHTML = html;
      SlideShow(slidePosition);
    });
}
/* -----------------slideshow ----------------*/

var slidePosition = 1;
// forward/Back controls
function plusSlides(n) {
  SlideShow((slidePosition += n));
}
//  images controls
function currentSlide(n) {
  SlideShow((slidePosition = n));
}
function SlideShow(n) {
  var i;
  var slides = document.getElementsByClassName("image-carousal");
  var circles = document.getElementsByClassName("dots");
  if (n > slides.length) {
    slidePosition = 1;
  }
  if (n < 1) {
    slidePosition = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < circles.length; i++) {
    circles[i].className = circles[i].className.replace(" enable", "");
  }
  slides[slidePosition - 1].style.display = "block";
  circles[slidePosition - 1].className += " enable";
}


function getProductFromStorage(){
  return localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];  
}