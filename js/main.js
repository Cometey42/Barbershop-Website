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
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#features" },
  { label: "Book", href: "#cta" },
  { label: "Contact", href: "#footer" },
];
// ----- Helpers / Functions -----
// Update footer year automatically
const setCurrentYear = () => {
  // this function will update the year in the footer
  const now = new Date(); // new Date() is a pre-built constructor that pulls real-time date info. We are giving the now variable that feature
  yearEl.textContent = now.getFullYear(); // we are changing the text content of the span element to get the new Date() info specifically the year
};
// Toggle mobile menu open/close
let isMenuOpen = false; // this variable keeps track of whether the mobile menu is currently open or closed
const toggleMobileMenu = () => {
  // this function will flip the mobile menu between open and closed each time it runs
  if (!mobileMenu) return; // if the mobileMenu element doesn't exist on the page, stop here so nothing breaks
  if (isMenuOpen === false) {
    // check our tracker variable to see if the menu is currently closed
    mobileMenu.classList.add("is-open"); // add the CSS class that makes the menu visible
    isMenuOpen = true; // update our tracker so we know the menu is now open
  } else {
    mobileMenu.classList.remove("is-open"); // remove the CSS class so the menu becomes hidden again
    isMenuOpen = false; // update our tracker so we know the menu is now closed
  }
};
// Close mobile menu (used when a link is clicked)
const closeMobileMenu = () => {
  // this function will force the mobile menu to close, no matter its current state
  if (!mobileMenu) return; // if the mobileMenu element doesn't exist on the page, stop here so nothing breaks
  mobileMenu.classList.remove("is-open"); // remove the CSS class so the menu becomes hidden
  isMenuOpen = false; // update our tracker variable to match, since the menu is now closed
};
// Reusable function with parameters (practice pattern)
const updateHeadingText = (newText) => {
  // this function will change the hero heading to whatever text is passed in
  if (!heading) return; // if the heading element doesn't exist on the page, stop here so nothing breaks
  heading.textContent = newText; // set the heading's visible text to the newText we were given
};
// ----- Event Listeners -----
// 1) Set year on page load
setCurrentYear();
// 2) Hamburger menu toggle
if (menuBtn) {
  // only wire this up if the hamburger button exists on the page
  menuBtn.addEventListener("click", () => {
    // whenever the hamburger button is clicked
    toggleMobileMenu(); // run our toggle function to open or close the menu
  });
}
// 3) Close mobile menu when a mobile link is clicked (event delegation)
if (mobileMenu) {
  // only wire this up if the mobile menu exists on the page
  mobileMenu.addEventListener("click", (event) => {
    // listen for any click inside the menu
    // If they clicked an <a> inside the menu, close it
    if (event.target.tagName === "A") {
      // check if the exact element clicked was a link
      closeMobileMenu(); // close the menu since the user is navigating away
    }
  });
}
// 4) CTA Button: “Book Now” (placeholder behavior)
if (ctaBtn) {
  // only wire this up if the CTA button exists on the page
  ctaBtn.addEventListener("click", () => {
    // whenever the "Book Now" button is clicked
    updateHeadingText("Booking coming next — great choice!"); // swap the hero heading to this placeholder message
  });
}
// 5) Call Button: try to use the phone number in the footer
if (callBtn) {
  // only wire this up if the call button exists on the page
  callBtn.addEventListener("click", () => {
    // whenever the call button is clicked
    // If you later set phoneLink href to tel:, this will work perfectly.
    // For now, this is a beginner-friendly placeholder.
    if (phoneLink) {
      // if we found a phone number element in the footer
      updateHeadingText("Call us at " + phoneLink.textContent); // show that phone number in the hero heading
    } else {
      updateHeadingText("Call feature coming next!"); // fall back to a placeholder message
    }
  });
}

// array.forEach((item) => {
// create element
// insert data
// add to page
//})

// ----- Render Features using forEach() -----
const renderFeatures = () => {
  if (!featureGrid) return;
  services.forEach((service) => {
    const card = document.createElement("article");
    card.classList.add("feature-card");
    card.innerHTML = `
 <img src="${service.image}" alt="${service.title}" class="feature-img"
/>
 <h3 class="feature-title">${service.title}</h3>
 <p class="feature-text">${service.text}</p>
 `;
    featureGrid.appendChild(card);
  });
};
//  if (!featureGrid) return; // guard clause- if the featureGrid element doesn't exist, don't run the function
// services.forEach(service...) everything in these parentheses will happen to each item in the array
// document.createElement("article") // creates an article tag and stores it in the variable, card
// card.classList.add("feature-card"); // adds the class feature-card to the article tag we created
// card.innerHTML = elements... takes the markup we created with all its attributes and gives it to the card variable with the articel tag in it
// `<img class="" />......` this is the markup that gets passed to article tag for each card
// featureGrid.appendChild("card"); // adds each article tag with all the classes, img, h3, p tags.... into the element whose ID is featureGrid
// ----- Render Features using map() -----
const renderFeaturesMap = () => {
  const cardsHTML = services
    .map((service) => {
      return `
    <article class="feature-card">
      <img src="${service.image}" alt="${service.title}" class="feature-img" />
      <h3 class="feature-title">${service.title}</h3>
      <p class="feature-text">${service.text}</p>
      </article>
    `;
    })
    .join("");

  featureGrid.innerHTML = cardsHTML;
};
// ----- Render Navigation using map() -----
const renderNavigation = () => {
  // Desktop Nav
  if (nav) {
    const navHTML = navLinks.map((link) => {
        return `
        <a href="${link.href}" class="nav-link">${link.label}</a>
      `;
      }).join("");

    nav.innerHTML = navHTML;
  }
  // Mobile Nav
  if (mobileMenu) {
    const mobileHTML = navLinks.map((link) => {
        return `
        <a href="${link.href}" class="mobile-link">${link.label}</a>
      `;
      }).join("");

    mobileMenu.innerHTML = mobileHTML;
  }
};
// array.map()
// return HTML
// join("")
// insert into DOM

// Why .join()?
// Because map returns an array
// [<"a>Home</a>", "<a>About</a>"]
// join converts it into ONE HTML string


// ----- Function calls -----
renderFeatures();
// renderFeaturesMap();
renderNavigation();
