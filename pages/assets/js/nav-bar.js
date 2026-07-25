// adapted from an example in https://github.com/WebDevSimplified/css-tutorials

const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];
const navbarDivider = document.getElementsByClassName("navbar-divier")[0];
const homeLink = document.getElementsByClassName("home")[0];
const aboutLink = document.getElementsByClassName("about")[0];
const historyLink = document.getElementsByClassName("history")[0];
const servicesLink = document.getElementsByClassName("services")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  toggleButton.classList.toggle("active");
  navbarDivider.classList.toggle("active");
});

homeLink.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  toggleButton.classList.toggle("active");
});

aboutLink.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  toggleButton.classList.toggle("active");
});

servicesLink.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  toggleButton.classList.toggle("active");
});

historyLink.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  toggleButton.classList.toggle("active");
});
