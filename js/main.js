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
const nav = document.getElementById("nav");
const siteHeader = document.querySelector(".site-header");
// ----- Modal Elements -----
const serviceModal = document.getElementById("serviceModal");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalPrice = document.getElementById("serviceModalPrice");
const serviceModalList = document.getElementById("serviceModalList");
// ----- Services Data (Array of Objects) -----
const services = [
{
id: 1,
title: "Classic Haircut",
image: "assets/images/feature-1.jpg",
alt: "Classic haircut",
description: "Timeless cuts with modern precision—tailored to your style.",
price: 25,
popular: true,
details: [
"Consultation with your barber before the cut begins.",
"Hair sectioning and shape-up based on your preferred style.",
"Professional clippers, trimmers, and shears used for precision.",
"Neckline cleanup and finishing touches included.",
"Light styling product applied for a clean final look."
]
},
{
id: 2,
title: "Beard Trim",
image: "assets/images/feature-4.jpg",
alt: "Beard trim",
description: "Shape, line-up, and refine your beard for a clean finish.",
price: 15,
popular: false,
details: [
"Beard assessment and shaping based on face structure.",
"Line-up around cheeks, jawline, and neckline.",
"Trimmers and detail tools used for crisp edges.",
"Conditioning beard product may be applied for softness.",
"Final symmetry check for a polished finish."
]
},
{
id: 3,
title: "Straight Razor Shave",
image: "assets/images/feature-3.jpg",
alt: "Straight razor shave",
description: "Hot towel, smooth shave, and classic barbershop experience.",
price: 30,
popular: true,
details: [
"Hot towel prep to soften facial hair and open pores.",
"Premium shaving cream or lather applied to protect the skin.",
"Straight razor shave performed with careful detailing.",
"Second hot towel may be used for comfort and cleanup.",
"Aftershave or soothing skin product applied after service."
]
},
{
id: 4,
title: "Fade & Style",
image: "assets/images/feature-2.jpg",
alt: "Fade haircut",
description: "A clean fade with finishing detail for a sharp, modern look.",
price: 35,
popular: false,
details: [
"Style consultation before clipper work begins.",
"Fade blended to your preferred level and finish.",
"Detailing around temples, neckline, and beard area if needed.",
"Scissors and clipper-over-comb may be used for texture.",
"Styling product added to complete the final look."
]
},
{
id: 5,
title: "Kids Cut",
image: "assets/images/feature-1.jpg",
alt: "Kids haircut",
description: "Clean, comfortable haircut service for younger clients.",
price: 20,
popular: false,
details: [
"Simple consultation with child and parent if needed.",
"Age-appropriate haircut with comfort in mind.",
"Careful clipper and scissor work for a clean finish.",
"Light cleanup around the neckline and ears.",
"Styled neatly before leaving the chair."
]
},
{
id: 6,
title: "Head Shave",
image: "assets/images/feature-3.jpg",
alt: "Head shave",
description: "Smooth head shave with classic barbershop treatment.",
price: 28,
popular: true,
details: [
"Scalp prep with warm towel treatment.",
"Protective shave product applied before razor work.",
"Close shave performed for a smooth finish.",
"Scalp cleaned and checked for even consistency.",
"Moisturizing scalp product applied after the shave."
]
}
];
// ----- Navigation Data (Array of Objects) -----
const navLinks = [
{ label: "Home", href: "#hero" },
{ label: "Services", href: "#features" },
{ label: "Book", href: "#cta" },
{ label: "Contact", href: "#footer" }
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
// Adds the is-scrolled class to the site-header DOM element
const handleHeaderOnScroll = () => {
if (!siteHeader) return;
if (window.scrollY > 10) {
 siteHeader.classList.add("is-scrolled");
} else {
 siteHeader.classList.remove("is-scrolled");
 }
}; // is-scrolled is in the css file
// ----- Modal Logic -----
const openServiceModal = (serviceId) => {
if (!serviceModal || !serviceModalTitle || !serviceModalPrice || !serviceModalList) return;
const selectedService = services.find((service) => service.id === Number(serviceId));
if (!selectedService) return;
serviceModalTitle.textContent = selectedService.title;
serviceModalPrice.textContent = `$${selectedService.price}`;
serviceModalList.innerHTML = selectedService.details.map((detail) => `<li>${detail}</li>`)
.join("");
serviceModal.classList.add("is-open");
serviceModal.setAttribute("aria-hidden", "false");
document.body.style.overflow = "hidden";
};
const closeServiceModal = () => {
if (!serviceModal) return;
serviceModal.classList.remove("is-open");
serviceModal.setAttribute("aria-hidden", "true");
document.body.style.overflow = "";
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
// 6) Rounds navbar and makes it sticky
window.addEventListener("scroll", handleHeaderOnScroll);
// Run once on page load in case user refreshes mid-scroll
handleHeaderOnScroll();
// 7) Open/Close Service Modals
if (featureGrid) {
featureGrid.addEventListener("click", (event) => {
const clickedButton = event.target.closest(".service-details-btn");
if (!clickedButton) return;
const serviceId = clickedButton.dataset.serviceId;
openServiceModal(serviceId);
});
}
if (serviceModalClose) {
serviceModalClose.addEventListener("click", closeServiceModal);
}
if (serviceModalOverlay) {
serviceModalOverlay.addEventListener("click", closeServiceModal);
}
document.addEventListener("keydown", (event) => {
if (event.key === "Escape") {
closeServiceModal();
}
});
// ----- Render Functions -----
const renderNavigation = () => {
if (nav) {
const navHTML = navLinks.map((link) => `<a href="${link.href}" class="nav-link">${link.label}</a>`)
.join("");
nav.innerHTML = navHTML;
}
if (mobileMenu) {
const mobileHTML = navLinks.map((link) => `<a href="${link.href}" class="mobile-link">${link.label}</a>`)
.join("");
mobileMenu.innerHTML = mobileHTML;
}
};
const renderServices = () => {
if (!featureGrid) return;
const servicesHTML = services.map((service) => {
let badgeHTML = "";
if (service.popular) {
badgeHTML = `<p class="service-badge">Popular Choice</p>`;
} else {
badgeHTML = `<p class="service-badge alt-badge">Barber Favorite</p>`;
}
return `
<article class="feature-card">
<img
src="${service.image}"
alt="${service.alt}"
class="feature-img"
/>
<h3 class="feature-title">${service.title}</h3>
<p class="feature-text">${service.description}</p>
${badgeHTML}
<p class="service-price">$${service.price}</p>
<div class="service-actions">
<button
class="service-details-btn"
type="button"
data-service-id="${service.id}"
>
View Details
</button>
</div>
</article>
`;
})
.join("");
featureGrid.innerHTML = servicesHTML;
};
// ----- Render Features using forEach -----
// const renderFeatures = () => {
// if (!featureGrid) return;
// services.forEach(service => {
//  const card = document.createElement("article"); // creates an articel tag and stores it inside the variable card
//  card.classList.add("feature-card"); // classList allows us to modify the classes an element has. The add() adds the class to the element
//  card.innerHTML = ` 
//  <img src="${service.image}" alt="${service.title}" class="feature-img"/>
//  <h3 class="feature-title">${service.title}</h3>
//  <p class="feature-text">${service.text}</p>
// `; // innerHTML allows us to read or change anything inside of an element it has access to 
//  // template literals uses the `${}` and allows us to structure how we want our data returned
//  featureGrid.appendChild(card);
// });
// };

// const renderFeaturesMap = () => {
//     const cardsHTML = services.map(service => {
//         return `
//         <article class="feature-card">
//         <img src="${service.image}" alt="${service.title}" class="feature-img" />
//         <h3 class="feature-title">${service.title}</h3>
//         <p class="feature-text">${service.text}</p>
//         </article>
//         `;
//     }).join("");
//     featureGrid.innerHTML = cardsHTML;
// };

// ----- Render Navigation using map() -----
// const renderNavigation = () => {
// // Desktop Nav
// if (nav) {
//  const navHTML = navLinks.map(link => {
//  return `
//  <a href="${link.href}" class="nav-link">${link.label}</a>
//  `;}).join("");
//  nav.innerHTML = navHTML;
//  };
// // Mobile Nav
// if (mobileMenu) {
//  const mobileHTML = navLinks.map(link => {
//  return `
//  <a href="${link.href}" class="mobile-link">${link.label}</a>
//  `;}).join("");
//  mobileMenu.innerHTML = mobileHTML;
//  };
// };

// ----- Function Calls -----
// renderFeatures();
// renderFeaturesMap();
renderNavigation();
renderServices();
