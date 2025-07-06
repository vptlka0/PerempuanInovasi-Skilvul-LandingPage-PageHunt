function changeHeaderBackground(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < 600;
}

// hamburger menu
function toggleMenu() {
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
}

window.addEventListener("scroll", function () {
  const tentangKamiElement = document.getElementById("tentangKami");
  if (changeHeaderBackground(tentangKamiElement)) {
    console.log("Elemen muncul di layar!");
    document.getElementById("header").classList.add("colorHeader");
    document.getElementById("header").classList.remove("colorHeaderDefault");
    document.getElementById("nav").classList.add("navbarWhite");
    document.getElementById("nav").classList.remove("navbar");
  } else {
    document.getElementById("header").classList.add("colorHeaderDefault");
    document.getElementById("header").classList.remove("colorHeader");
    document.getElementById("nav").classList.remove("navbarWhite");
    document.getElementById("nav").classList.add("navbar");
  }
});

// Tambahkan kode JavaScript kalian di file ini

function berandaNavClick() {
  document.getElementById("hero").scrollIntoView();
}

function tentangKamiNavClick() {
  document.getElementById("tentangKami").scrollIntoView();
}

function produkNavClick() {
  document.getElementById("produk").scrollIntoView();
}

function testimoniNavClick() {
  document.getElementById("testimoni").scrollIntoView();
}

function closeStatClick() {
  document.getElementById("closingStatement").scrollIntoView();
}

function checkIsVisible(element) {
  //   const produkNavbar = document.getElementById("produkActive");
  const rect = element.getBoundingClientRect();
  if (
    rect.top < window.innerHeight / 2 &&
    rect.bottom > window.innerHeight / 2
  ) {
    return true;
    // produkNavbar.classList.add("active");
  } else {
    return false;
    // produkNavbar.classList.remove("active");
  }
}

// functionOnScrolll jalan ketika user scroll halamannya
function functionScroll() {
  const heroSection = document.getElementById("hero");
  const tentangKamiSection = document.getElementById("tentangKami");
  const produkSection = document.getElementById("produk");
  const testimoniSection = document.getElementById("testimoni");

  const berandaNavbar = document.getElementById("Navbar-beranda");
  const tentangKamiNavbar = document.getElementById("Navbar-Us");
  const produkNavbar = document.getElementById("Navbar-produk");
  const testimoniNavbar = document.getElementById("Navbar-testimoni");

  const heroIsVisible = checkIsVisible(heroSection);
  const tentangKamiIsVisible = checkIsVisible(tentangKamiSection);
  const produkIsVisible = checkIsVisible(produkSection);
  const testimoniIsVisible = checkIsVisible(testimoniSection);

  // beranda
  if (heroIsVisible === true) {
    berandaNavbar.classList.add("active");
  } else {
    berandaNavbar.classList.remove("active");
  }

  // tentang kami
  if (tentangKamiIsVisible === true) {
    tentangKamiNavbar.classList.add("active");
  } else {
    tentangKamiNavbar.classList.remove("active");
  }

  // produk
  if (produkIsVisible === true) {
    produkNavbar.classList.add("active");
  } else {
    produkNavbar.classList.remove("active");
  }
  // testimoni
  if (testimoniIsVisible === true) {
    testimoniNavbar.classList.add("active");
  } else {
    testimoniNavbar.classList.remove("active");
  }
}

const slider = document.getElementById("slider");
const cards = slider.querySelectorAll(".cardReview");
const dotsContainer = document.getElementById("dotsContainer");
let dots = [];
let cardsPerView = getCardsPerView();
let gap = parseInt(getComputedStyle(slider).gap) || 16;

function getCardsPerView() {
  const width = window.innerWidth;
  if (width < 975) return 1;
  if (width < 1345) return 2;
  if (width < 1920) return 3;
  return 3;
}

function setupDots() {
  dotsContainer.innerHTML = "";
  cardsPerView = getCardsPerView();
  const totalGroups = Math.ceil(cards.length / cardsPerView);

  for (let i = 0; i < totalGroups; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      const cardWidth = cards[0].offsetWidth + gap;
      const scrollTo = i * cardsPerView * cardWidth;
      slider.scrollTo({ left: scrollTo, behavior: "smooth" });
    });

    dotsContainer.appendChild(dot);
  }

  dots = dotsContainer.querySelectorAll(".dot");
}

function updateActiveDot() {
  const cardWidth = cards[0].offsetWidth + gap;
  const groupWidth = cardsPerView * cardWidth;
  const index = Math.round(slider.scrollLeft / groupWidth);

  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

// Inisialisasi
setupDots();

// Scroll listener
slider.addEventListener("scroll", () => {
  updateActiveDot();
});

// Resize listener
window.addEventListener("resize", () => {
  setupDots();
  updateActiveDot();
});

// Form Validation
function handleGetFormData() {
  const nameInput = document.getElementById("name");
  const nameValue = nameInput.value;
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value;
  const cityInput = document.getElementById("city");
  const cityValue = cityInput.value;
  const zipCodeInput = document.getElementById("zip-code");
  const zipCodeValue = zipCodeInput.value;
  const statusInput = document.getElementById("status");
  const statusCheck = statusInput.checked;

  const object = {
    name: nameValue,
    email: emailValue,
    city: cityValue,
    zipCode: zipCodeValue,
    status: statusCheck,
  };
  return object;
}

function checkboxIsChecked() {
  const statusInput = document.getElementById("status");
  const statusCheck = statusInput.checked;
  return statusCheck;
}

function validateFormData(parameter) {
  if (
    parameter !== null &&
    isNumber(parameter.zipCode) &&
    checkboxIsChecked()
  ) {
    return true;
  } else {
    return false;
  }
}

function isNumber(parameter) {
  if (isNaN(parameter) === false) {
    return true;
  } else {
    return false;
  }
}

function submit() {
  const formData = handleGetFormData();
  validateFormData(formData);
  const isFormValid = validateFormData(formData);
  const warningContainerElement = document.getElementById("warningContainer");
  const warningElement = document.getElementById("warning");
  if (isFormValid === true) {
    warningContainerElement.style.visibility = "hidden";
    warningElement.innerHTML = "";
  } else {
    warningContainerElement.style.visibility = "visible";
    warningElement.innerHTML = "Periksa form anda sekali lagi";
  }
}

const formElement = document.getElementById("my-form");
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  submit();
});
