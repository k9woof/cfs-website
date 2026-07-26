// simple drag/clickable image gallery

const gallery = document.querySelector(".image-gallery");
let isDown = false;
let startX;
let scrollLeft;

// mouse/touch down
gallery.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = gallery.scrollLeft;
});

// mouse/touch up
window.addEventListener("mouseup", () => {
  isDown = false;
});

// mouse/touch drag left or right
window.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = x - startX;
  gallery.scrollLeft = scrollLeft - walk;
});
