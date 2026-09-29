// ----- Navigation Data (Array of Objects) -----
const navLinks = [
{ label: "Home", href: "#hero" },
{ label: "Services", href: "#features" },
{ label: "Book", href: "#cta" },
{ label: "Contact", href: "#footer" }
];


const nav = document.getElementById("nav");




const siteHeader = document.querySelector(".site-header");
const handleHeaderOnScroll = () => {
if (!siteHeader) return;
if (window.scrollY > 10) {
 siteHeader.classList.add("is-scrolled");
} else {
 siteHeader.classList.remove("is-scrolled");
 }
};



window.addEventListener("scroll", handleHeaderOnScroll);




handleHeaderOnScroll();