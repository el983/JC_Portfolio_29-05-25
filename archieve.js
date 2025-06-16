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

window.addEventListener('scroll', getCenterElementColor);
window.addEventListener('load', getCenterElementColor);

