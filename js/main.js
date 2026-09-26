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
// ----- Helpers / Functions -----
// Update footer year automatically
const setCurrentYear = () => { // this function will update the year in the footer
  const now = new Date(); // new Date() is a pre-built constructor that pulls real-time date info. We are giving the now variable that feature
  yearEl.textContent = now.getFullYear(); // we are changing the text content of the span element to get the new Date() info specifically the year
};
// Toggle mobile menu open/close
let isMenuOpen = false; // this variable keeps track of whether the mobile menu is currently open or closed
const toggleMobileMenu = () => { // this function will flip the mobile menu between open and closed each time it runs
  if (!mobileMenu) return; // if the mobileMenu element doesn't exist on the page, stop here so nothing breaks
  if (isMenuOpen === false) { // check our tracker variable to see if the menu is currently closed
    mobileMenu.classList.add("is-open"); // add the CSS class that makes the menu visible
    isMenuOpen = true; // update our tracker so we know the menu is now open
  } else {
    mobileMenu.classList.remove("is-open"); // remove the CSS class so the menu becomes hidden again
    isMenuOpen = false; // update our tracker so we know the menu is now closed
  }
};
// Close mobile menu (used when a link is clicked)
const closeMobileMenu = () => { // this function will force the mobile menu to close, no matter its current state
  if (!mobileMenu) return; // if the mobileMenu element doesn't exist on the page, stop here so nothing breaks
  mobileMenu.classList.remove("is-open"); // remove the CSS class so the menu becomes hidden
  isMenuOpen = false; // update our tracker variable to match, since the menu is now closed
};
// Reusable function with parameters (practice pattern)
const updateHeadingText = (newText) => { // this function will change the hero heading to whatever text is passed in
  if (!heading) return; // if the heading element doesn't exist on the page, stop here so nothing breaks
  heading.textContent = newText; // set the heading's visible text to the newText we were given
};
// ----- Event Listeners -----
// 1) Set year on page load
setCurrentYear();
// 2) Hamburger menu toggle
if (menuBtn) { // only wire this up if the hamburger button exists on the page
  menuBtn.addEventListener("click", () => { // whenever the hamburger button is clicked
    toggleMobileMenu(); // run our toggle function to open or close the menu
  });
}
// 3) Close mobile menu when a mobile link is clicked (event delegation)
if (mobileMenu) { // only wire this up if the mobile menu exists on the page
  mobileMenu.addEventListener("click", (event) => { // listen for any click inside the menu
    // If they clicked an <a> inside the menu, close it
    if (event.target.tagName === "A") { // check if the exact element clicked was a link
      closeMobileMenu(); // close the menu since the user is navigating away
    }
  });
}
// 4) CTA Button: “Book Now” (placeholder behavior)
if (ctaBtn) { // only wire this up if the CTA button exists on the page
  ctaBtn.addEventListener("click", () => { // whenever the "Book Now" button is clicked
    updateHeadingText("Booking coming next — great choice!"); // swap the hero heading to this placeholder message
  });
}
// 5) Call Button: try to use the phone number in the footer
if (callBtn) { // only wire this up if the call button exists on the page
  callBtn.addEventListener("click", () => { // whenever the call button is clicked
    // If you later set phoneLink href to tel:, this will work perfectly.
    // For now, this is a beginner-friendly placeholder.
    if (phoneLink) { // if we found a phone number element in the footer
      updateHeadingText("Call us at " + phoneLink.textContent); // show that phone number in the hero heading
    } else {
      updateHeadingText("Call feature coming next!"); // fall back to a placeholder message
    }
  });
}
