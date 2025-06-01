const panels = [
  "assets/client3.png",
  "assets/client4.png",
  "assets/client5.jpeg",
  "assets/client6.jpeg",
  "assets/client7.jpeg",
  "assets/client8.jpeg",
  "assets/client9.jpeg",
  "assets/jcnije_nav.jpeg"
];

let currentIndex = 0;
const angle = 180 / (panels.length - 1);
const gallery = document.getElementById("gallery");

function getTranslateZ() {
  return window.innerWidth <= 600 ? "translateZ(90vw)" : "translateZ(40vw)";
}

function renderGallery() {
  gallery.innerHTML = "";
  panels.forEach((src, i) => {
    let offset = (i - currentIndex + panels.length) % panels.length;
    if (offset > panels.length / 2) offset -= panels.length;
    const isFocused = i === currentIndex;

    const panel = document.createElement("div");
    panel.className = `panel ${isFocused ? "focused" : "blurred"}`;
    panel.style.backgroundImage = `url(${src})`;
    panel.style.transform = `rotateY(${offset * angle}deg) ${getTranslateZ()} ${!isFocused ? "scale(0.8)" : ""}`;

    gallery.appendChild(panel);
  });

  // Set blurred background to match focused image
  const bg = document.getElementById("background-blur");
  bg.style.backgroundImage = `url(${panels[currentIndex]})`;
}

function handleNext() {
  currentIndex = (currentIndex + 1) % panels.length;
  renderGallery();
}

function handlePrev() {
  currentIndex = (currentIndex - 1 + panels.length) % panels.length;
  renderGallery();
}

// Swipe and Drag
let dragStartX = null;
let dragging = false;
let touchStartX = null;
let touchEndX = null;

function handleMouseDown(e) {
  dragging = true;
  dragStartX = e.clientX;
}

function handleMouseMove(e) {
  if (!dragging) return;
  const diff = e.clientX - dragStartX;
  if (diff > 50) {
    handlePrev();
    dragging = false;
  } else if (diff < -50) {
    handleNext();
    dragging = false;
  }
}

function handleMouseUp() {
  dragging = false;
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
  const diff = touchEndX - touchStartX;
  if (diff > 50) {
    handlePrev();
  } else if (diff < -50) {
    handleNext();
  }
}

let lastScrollTime = 0;

function handleWheelScroll(e) {
  const now = Date.now();

  // Prevent scroll spamming: only trigger once every 500ms
  if (now - lastScrollTime < 500) return;

  if (e.deltaY > 0) {
    handleNext();
  } else if (e.deltaY < 0) {
    handlePrev();
  }

  lastScrollTime = now;
  e.preventDefault();
}

window.addEventListener("wheel", handleWheelScroll, { passive: false });


window.addEventListener("load", renderGallery);
window.addEventListener("resize", renderGallery);
