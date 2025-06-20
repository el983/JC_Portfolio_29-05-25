const archiveText = document.getElementById('archiveText');

function getCenterElementColor() {
  const sections = document.querySelectorAll('.image-section');
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    if (
      rect.left < viewportCenterX &&
      rect.right > viewportCenterX &&
      rect.top < viewportCenterY &&
      rect.bottom > viewportCenterY
    ) {
      const bgColor = getComputedStyle(section).getPropertyValue('--bg-color').trim();
      archiveText.style.color = bgColor;
    }
  });
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

window.addEventListener('scroll', getCenterElementColor);
window.addEventListener('load', getCenterElementColor);

