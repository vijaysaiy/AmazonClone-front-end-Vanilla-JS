const productList = document.querySelector(".slideshow");

eventListner("slideshow.json");

function eventListner(component) {
  window.addEventListener("DOMContentLoaded", () => {
    loadJSON(component);
  });
}

function loadJSON(component) {
  fetch(component)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((carousal) => {
        html += `
            <div class="image-carousal">
                <img class="home-image" src=${carousal.imgSrc} alt="">
            </div>              
            `;
      });
      html += `<a class="Back" onclick="plusSlides(-1)">&#10094;</a>
        <a class="forward" onclick="plusSlides(1)">&#10095;</a>
        <div style="text-align:center">
            <span class="dots" onclick="currentSlide(1)"></span>
            <span class="dots" onclick="currentSlide(2)"></span>
            <span class="dots" onclick="currentSlide(3)"></span>
          </div>`;
      productList.innerHTML = html;
      console.log(data)
      SlideShow(slidePosition);
    });
    console.log(data)
}
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
