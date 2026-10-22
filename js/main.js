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
const phoneLink = document.getElementById("phoneLink");
const heading = document.getElementById("heroHeading");
const featureGrid = document.getElementById("featureGrid");
// ----- Services Data (Array of Objects) -----
const services = [
 {
 title: "Classic Haircut",
 text: "Timeless cuts with modern precision tailored to your style.",
 image: "assets/images/feature-1.jpg"
},
 {
 title: "Beard Trim",
 text: "Shape and line-up your beard for a clean, sharp finish.",
 image: "assets/images/feature-2.jpg"
},
 {
 title: "Straight Razor Shave",
 text: "Hot towel treatment with a smooth traditional shave.",
 image: "assets/images/feature-3.jpg"
 }
];
// ----- Helpers / Functions -----
// Update footer year automatically
const setCurrentYear = () => {
const now = new Date(); // stores in the variable now the year/month/day/hour/minute/second/milisecond from when the function was called
yearEl.textContent = now.getFullYear();
};
// Toggle mobile menu open/close
let isMenuOpen = false;
const toggleMobileMenu = () => {
if (!mobileMenu) return; // stop clause; if mobileMenu doesn't exist return nothing
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
if (!mobileMenu) return; // if the mobileMenu doesn't exist, return nothing;
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
toggleMobileMenu();
});
}
// 3) Close mobile menu when a mobile link is clicked (event delegation)
if (mobileMenu) {
mobileMenu.addEventListener("click", (event) => {
// If they clicked an <a> inside the menu, close it
if (event.target.tagName === "A") { // event.target.tagName returns "A" so the other side of the === must be "A"
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

// ----- Render Features using forEach -----
const renderFeatures = () => {
if (!featureGrid) return;
services.forEach(service => {
 const card = document.createElement("article");
 card.classList.add("feature-card"); // innerHTML allows us to read or change anything inside of an element it has access to
 card.innerHTML = ` 
 <img src="${service.image}" alt="${service.title}" class="feature-img"/>
 <h3 class="feature-title">${service.title}</h3>
 <p class="feature-text">${service.text}</p>
 `; // template literals uses the `${}` and allows us to structure how we want our data returned
 featureGrid.appendChild(card);
});
};

// ----- Function Calls -----
renderFeatures();