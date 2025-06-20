// const panels = [
//   "assets/client3.png",
//   "assets/client4.png",
//   "assets/client5.jpeg",
//   "assets/client6.jpeg",
//   "assets/client7.jpeg",
//   "assets/client8.jpeg",
//   "assets/client9.jpeg",
//   "assets/jcnije_nav.jpeg"
// ];

const panels = [
  { image: "assets/b1.jpeg", text: "Leadership Award – Adamas University 2020" },
  { image: "assets/b2.jpeg", text: "Most Promising Educator of 2021 – South Asian Chamber of Research & Development" },
  { image: "assets/b3.jpeg", text: "“Campus to Corporate - Guru of the year 2022” by Nikhil Bharat Shiksha Parishad" },
  { image: "assets/b4.jpeg", text: "“Top Icon of India 2024” – Business Talkz Magazine" },
  { image: "assets/b5.jpeg", text: "“Honorary Fellowship (Domain Management)” by All India Eminent Faculty Council of Engg. Mgmt. & Technology" },
  
];

let currentIndex = 0;
const angle = 30;
const gallery = document.getElementById("gallery");

function getTranslateZ() {
  return window.innerWidth <= 600 ? "translateZ(90vw)" : "translateZ(40vw)";
}

function renderGallery() {
  gallery.innerHTML = "";

  const total = panels.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const positions = [
    { index: prevIndex, offset: -1 },
    { index: currentIndex, offset: 0 },
    { index: nextIndex, offset: 1 }
  ];

  positions.forEach(({ index, offset }) => {
    const isFocused = offset === 0;
    const panelData = panels[index];

    const panel = document.createElement("div");
    panel.className = `panel ${isFocused ? "focused" : "blurred"}`;
    panel.style.backgroundImage = `url(${panelData.image})`;

    const rotation = offset * angle;
    const scale = isFocused ? 1 : 0.8;
    panel.style.transform = `rotateY(${rotation}deg) ${getTranslateZ()} scale(${scale})`;

    // Add text overlay
    const textOverlay = document.createElement("div");
    textOverlay.className = "panel-text";
    textOverlay.textContent = panelData.text;

    panel.appendChild(textOverlay);
    gallery.appendChild(panel);
  });

  // Background blur update
  const bg = document.getElementById("background-blur");
  bg.style.backgroundImage = `url(${panels[currentIndex].image})`;
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

function updateTime() {
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
    const timeString = now.toLocaleTimeString('en-IN', options);
    const timeElem = document.getElementById("current-time");
    if (timeElem) {
      timeElem.textContent = timeString;
    }
  }

  setInterval(updateTime, 1000);
  updateTime();

window.addEventListener("wheel", handleWheelScroll, { passive: false });


window.addEventListener("load", renderGallery);
window.addEventListener("resize", renderGallery);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = Math.round((scrollTop / totalHeight) * 100);

  document.getElementById("scrollPercent").textContent = `${scrollPercent}%`;
});
