gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const slides = gsap.utils.toArray(".slide");
  const images = gsap.utils.toArray(".active-slide img");

  const initialZs = slides.map(slide => {
    const m = window
      .getComputedStyle(slide)
      .transform.match(/matrix3d\((.+)\)/);
    return m ? parseFloat(m[1].split(", ")[14]) : 0;
  });

  ScrollTrigger.create({
    trigger: ".container",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: self => {
      const zIncrement = self.progress * 22500;
      let activeIndex = -1;

      slides.forEach((slide, i) => {
        const currentZ = initialZs[i] + zIncrement;

        slide.style.transform = `
          translateX(-50%)
          translateY(-50%)
          translateZ(${currentZ}px)
        `;
        slide.style.opacity = currentZ > -2500
          ? (currentZ + 2500) / 2500
          : 0;

        if (currentZ > -2500 && currentZ < 0) {
          activeIndex = i;
        }
      });

      images.forEach((img, i) => {
        if (i === activeIndex) {
          img.classList.add("active");
          gsap.set(img, { opacity: 1 });
        } else {
          img.classList.remove("active");
          gsap.set(img, { opacity: 0 });
        }
      });
    }
  });

  // ⏰ Add this block for Kolkata time display
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
});
