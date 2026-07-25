// simple drag/clickable image gallery

const gallery = document.querySelector(".image-gallery");

let isDown = false;
let startX;
let scrollLeft;

gallery.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = gallery.scrollLeft;
});

window.addEventListener("mouseup", () => {
  isDown = false;
});

window.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = x - startX;
  gallery.scrollLeft = scrollLeft - walk;
});
