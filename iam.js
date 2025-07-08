// TIME CLOCK
function updateTime() {
  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  };
  document.getElementById("current-time").textContent = now.toLocaleTimeString('en-IN', options);
}
setInterval(updateTime, 1000);
updateTime();

const zoomTexts = document.querySelectorAll('.zoom-text');
const halves = document.querySelectorAll('.half');

const observerOptions = {
  threshold: 0.3
};

// 👇 Function to start observing AFTER initial load animations
function startObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, observerOptions);

  zoomTexts.forEach(el => observer.observe(el));
  halves.forEach(el => observer.observe(el));
}

// 👇 Run initial stagger on load
window.addEventListener('load', () => {
  setTimeout(() => zoomTexts[0].classList.add('show'), 800);
  setTimeout(() => zoomTexts[1].classList.add('show'), 3000);
  setTimeout(() => zoomTexts[2].classList.add('show'), 4500);

  // Start observing after last animation finishes (~13s)
  setTimeout(() => {
    startObserver();
  }, 5500);
});
