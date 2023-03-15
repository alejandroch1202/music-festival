document.addEventListener("DOMContentLoaded", function () {
  initApp();
});

function initApp() {
  fixedNav();
  createGallery();
  scrollNav();
}

function fixedNav() {
  const bar = document.querySelector(".header");
  const about = document.querySelector(".about");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (about.getBoundingClientRect().bottom < 0) {
      bar.classList.add("fixed");
      body.classList.add("body-scroll");
    } else {
      bar.classList.remove("fixed");
      body.classList.remove("body-scroll");
    }
  });
}

function scrollNav() {
  const links = document.querySelectorAll(".main-nav a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const value = e.target.attributes.href.value;
      const section = document.querySelector(value);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function createGallery() {
  const gallery = document.querySelector(".image-gallery");

  for (let i = 1; i <= 12; i++) {
    const image = document.createElement("picture");
    image.innerHTML = `
    <picture>
    <source srcset="/build/img/thumb/${i}.avif" type="image/avif" />
    <source srcset="/build/img/thumb/${i}.webp" type="image/webp" />
    <img loading="lazy" width="200" height="300" src="img/thumb/${i}.jpg" alt="Imagen galeria ${i}"/>
    </picture>
    `;

    image.onclick = function () {
      showImage(i);
    };

    gallery.appendChild(image);
  }
}

function showImage(id) {
  const image = document.createElement("picture");
  image.innerHTML = `
  <picture>
  <source srcset="/build/img/grande/${id}.avif" type="image/avif" />
  <source srcset="/build/img/grande/${id}.webp" type="image/webp" />
  <img loading="lazy" width="200" height="300" src="img/grande/${id}.jpg" alt="Imagen galeria ${id}"/>
  </picture>
  `;
  // Create the image with the overlay
  const overlay = document.createElement("div");
  overlay.appendChild(image);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fix-body");
    overlay.remove();
  };

  // Buttom to close the image (modal)
  const closePicture = document.createElement("p");
  closePicture.textContent = "X";
  closePicture.classList.add("close-button");
  closePicture.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fix-body");
    overlay.remove();
  };
  overlay.appendChild(closePicture);

  // Add it to the HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fix-body");
}
