// =========================
// File: js/main.js
// Vintage Barbershop Project
// =========================
// ----- DOM Elements -----
const yearEl = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const ctaBtn = document.getElementById("ctaBtn");
const callBtn = document.getElementById("callBtn");
const phoneLink = document.getElementById("phoneLink"); // we won't be using an actual phone feature
const heading = document.getElementById("heroHeading");
const featureGrid = document.getElementById("featureGrid");

// ----- Services Data (Array of Objects) -----
const services = [
  {
    title: "Classic Haircut",
    text: "Timeless cuts with modern precision tailored to your style.",
    image: "assets/images/feature-1.jpg",
  },
  {
    title: "Beard Trim",
    text: "Shape and line-up your beard for a clean, sharp finish.",
    image: "assets/images/feature-2.jpg",
  },
  {
    title: "Straight Razor Shave",
    text: "Hot towel treatment with a smooth traditional shave.",
    image: "assets/images/feature-3.jpg",
  },
];

// ----- Render Features using forEach -----
const renderFeatures = () => {
  if (!featureGrid) return; // if the feature grid is not found don't return anything. This errors from crashing the whole site.
  services.forEach((service) => {
    const card = document.createElement("article"); // creation of the article element
    card.classList.add("feature-card"); // adding a class to the article element
    card.innerHTML = `
 <img src="${service.image}" alt="${service.title}" class="feature-img"
/>
 <h3 class="feature-title">${service.title}</h3>
 <p class="feature-text">${service.text}</p>
 `;
    featureGrid.appendChild(card); // in this example appendChild() adds the article element we created to the bottom of the list of elements in the div whose id is featureGrid
  });
};

// ----- Helpers / Functions -----
// Update footer year automatically
const setCurrentYear = () => {
  const now = new Date();
  yearEl.textContent = now.getFullYear();
};

// Toggle mobile menu open/close
let isMenuOpen = false;
const toggleMobileMenu = () => {
  // opens and closes the mobile menu
  if (!mobileMenu) return; // stop clause
  if (isMenuOpen === false) {
    mobileMenu.classList.add("is-open");
    isMenuOpen = true;
  } else {
    mobileMenu.classList.remove("is-open");
    isMenuOpen = false;
  }
};

// Close mobile menu (used when a link is clicked)
const closeMobileMenu = () => {
  // when the user clicks a link in the navbar the mobileMenu will close
  if (!mobileMenu) return;
  mobileMenu.classList.remove("is-open");
  isMenuOpen = false;
};

// Reusable function with parameters (practice pattern)
const updateHeadingText = (newText) => {
  if (!heading) return;
  heading.textContent = newText;
};

// ----- Event Listeners -----
// 1) Set year on page load
setCurrentYear();

// 2) Hamburger menu toggle
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    // adding eventListeners to the toggleMobileMenu()
    toggleMobileMenu();
  });
}

// 3) Close mobile menu when a mobile link is clicked (event delegation)
if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    // adding eventListeners to the closeMobileMenu()
    // If they clicked an <a> inside the menu, close it
    if (event.target.tagName === "A") {
      // event represents what was triggered, target is what was triggered, tagName is the specific element name that was targeted and returns a capital letter(s), i.e DIV, BUTTON...
      closeMobileMenu();
    }
  });
}

// 4) CTA Button: “Book Now” (placeholder behavior)
if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    updateHeadingText("Booking coming next — great choice!");
  });
}

// 5) Call Button: try to use the phone number in the footer
if (callBtn) {
  callBtn.addEventListener("click", () => {
    // If you later set phoneLink href to tel:, this will work perfectly.
    // For now, this is a beginner-friendly placeholder.
    if (phoneLink) {
      updateHeadingText("Call us at " + phoneLink.textContent);
    } else {
      updateHeadingText("Call feature coming next!");
    }
  });
}

renderFeatures();