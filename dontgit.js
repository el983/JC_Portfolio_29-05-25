gsap.registerPlugin(ScrollTrigger);

const photos = gsap.utils.toArray(".photo");

// Only run animation on large screens
if (window.innerWidth > 768) {
  const directions = [
    { x: -500, y: -300 }, { x: 500, y: 500 },
    { x: -400, y: 300 },  { x: 600, y: -300 },
    { x: 0, y: 600 },     { x: 0, y: -500 },
    { x: -600, y: 0 },    { x: 700, y: 0 },
    { x: -300, y: 400 },  { x: 400, y: -400 },
    { x: -200, y: 500 },  { x: 500, y: 200 }
  ];

  ScrollTrigger.create({
    trigger: ".container",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;

      photos.forEach((photo, i) => {
        const dir = directions[i % directions.length];

        gsap.to(photo, {
          x: dir.x * progress,
          y: dir.y * progress,
          scale: 1 + progress * 1.5,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  });

  gsap.to(".parallax-bg", {
  scale: 2, // zoom in to 120%
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

}
