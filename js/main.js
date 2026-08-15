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
const nav = document.getElementById("nav");
const siteHeader = document.querySelector(".site-header");

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

// ----- Navigation Data (Array of Objects) -----
const navLinks = [
  { label: "Home", href: "#hero" }, // #'s are a palceholder since we don't have anywhere for these links to go
  { label: "Services", href: "#features" },
  { label: "Book", href: "#cta" },
  { label: "Contact", href: "#footer" },
];

// ----- Render Features using forEach -----
// const renderFeatures = () => {
//   if (!featureGrid) return; // if the feature grid is not found don't return anything. This errors from crashing the whole site.
//   services.forEach((service) => {
//     const card = document.createElement("article"); // creation of the article element
//     card.classList.add("feature-card"); // adding a class to the article element
//     card.innerHTML = `
//  <img src="${service.image}" alt="${service.title}" class="feature-img"
// />
//  <h3 class="feature-title">${service.title}</h3>
//  <p class="feature-text">${service.text}</p>
//  `; // innerHTML kinda acts like a script tag in HTML. It creates a space where HTML can be written in ajs file
//     featureGrid.appendChild(card); // in this example appendChild() adds the article element we created to the bottom of the list of elements in the div whose id is featureGrid
//   });
// };

// Breakdown:
// array.forEach(item => {
  // create element (createElement())
  // insert data (innerHTML)
  // add to page (appendChild())
  // }); 

// ----- Render Features using map() -----
const renderFeaturesMap = () => {
  const cardsHTML = services.map((service) => {
      return `
    <article class="feature-card">
    <img src="${service.image}" alt="${service.title}" class="feature-img" />
    <h3 class="feature-title">${service.title}</h3>
    <p class="feature-text">${service.text}</p>
    </article>
    `;
    }).join(""); // takes the items of an array and puts them into a string separated by "" in this example

  featureGrid.innerHTML = cardsHTML; // The new array cardsHTML will hold the cards
}; // innerHTML removes the quotation marks and add the elements into the div with the featureGrid id

// ----- Render Navigation using map() -----
const renderNavigation = () => {
  // Desktop Navigation links
  if (nav) {
    const navHTML = navLinks.map((link) => {
        return `
  <a href="${link.href}" class="nav-link">${link.label}</a>
 `;
      }).join("");

    nav.innerHTML = navHTML;
  }

  // Mobile Navigation links
  if (mobileMenu) {
    const mobileHTML = navLinks.map((link) => {
        return `
 <a href="${link.href}" class="mobile-link">${link.label}</a>
 `;
      }).join("");

    mobileMenu.innerHTML = mobileHTML;
  }
};
// What we just learned
// Skills               Concept
//          
// Object Arrays    Data Structure
// map()            Transforms Data
// Template Literals  Dynamic HTML
// DOM Rendering      UI Generation


// ----- Helpers / Functions -----

const handleHeaderOnScroll = () => {
  if (!siteHeader) return; // guard clause
  if (window.scrollY > 10) {
    siteHeader.classList.add("is-scrolled"); // classList adds/removes a class from an element via a variable like siteHeader, featureGrid, etc...
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
};

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

// 6) Changes header behavior on scroll
window.addEventListener("scroll", handleHeaderOnScroll);

// Function calls
// renderFeatures();
renderFeaturesMap();
renderNavigation();
handleHeaderOnScroll(); // runs once on page load in case the user refreshes mid scroll
