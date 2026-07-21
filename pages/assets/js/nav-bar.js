// adapted from an example in https://github.com/WebDevSimplified/css-tutorials

const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];
const navbarDivider = document.getElementsByClassName("navbar-divier")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
  toggleButton.classList.toggle("active");
  navbarDivider.classList.toggle("active");
});
