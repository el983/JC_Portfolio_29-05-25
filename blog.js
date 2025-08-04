const slides = [
  {
    date: '30 June 2025',
    title: 'Welcome to My Portfolio',
    videoUrl: 'https://www.youtube.com/embed/YZyiksDFbYg?si=i4BaVlnw8Jiu4Dvo',
    youtubeLink: 'https://youtu.be/YZyiksDFbYg?si=HDoumTc4zr-wAI7o',
  },
  {
    date: '9 June 2023',
    title: 'Being Resourceful',
    videoUrl: 'https://www.youtube.com/embed/MkOE8p8tCzc?si=AXngzdwPiare9DKF',
    youtubeLink: 'https://youtu.be/MkOE8p8tCzc?si=xc5bQjEm6qfMqZWs',
  },
  {
    date: '2 September 2022',
    title: 'Technocrat 22 - Critical Thinking',
    videoUrl: 'https://www.youtube.com/embed/lRUJPp3IKF4?si=ZtF37uvz1Kv9Ux3K',
    youtubeLink: 'https://youtu.be/lRUJPp3IKF4?si=w4MJ3YS87UbDEy5e',
  },
  {
    date: '22 July 2025',
    title: 'Interview with B TALKZ',
    videoUrl: 'image', // Special flag for image
    youtubeLink: 'https://www.linkedin.com/posts/cyber-kings-india_busiozine-joychowdhury-humancenteredleadership-activity-7351862038899380225-Se-X',
    image: 'https://media.licdn.com/dms/image/v2/D5622AQGls11yoI3Tog/feedshare-shrink_800/B56ZgcF775HMAg-/0/1752817984479?e=2147483647&v=beta&t=w8X63oLGB61RSFTpmZja6jLODGe_wnfGoKbawMVRU0Y' // Add your image path here
  },
   {
    date: '16 February 2016',
    title: 'Your Past has nothing to do with your Future',
    videoUrl: 'https://www.youtube.com/embed/hrbCvbJOTdQ?si=IFqsXDyAfdqmUR7y',
    youtubeLink: 'https://youtu.be/hrbCvbJOTdQ?si=IFqsXDyAfdqmUR7y',
  },
   {
    date: '9 February 2017',
    title: 'Fun with Emotional Intelligence',
    videoUrl: 'https://www.youtube.com/embed/mg17RORmOwU?si=e13dbF3BJ_KIT161',
    youtubeLink: 'https://youtu.be/mg17RORmOwU?si=e13dbF3BJ_KIT161',
  }
];

const container = document.getElementById('slidesContainer');

slides.forEach((slide, index) => {
  const slideEl = document.createElement('div');
  slideEl.className = 'slide';
  slideEl.classList.add(index % 2 === 0 ? 'animate-left' : 'animate-right');

  const isVideo = slide.videoUrl.startsWith('https://www.youtube.com/embed');

  slideEl.innerHTML = `
    <div class="video-section">
      ${
        isVideo
          ? `<iframe 
              src="${slide.videoUrl}" 
              title="${slide.title}" 
              frameborder="0" 
              allowfullscreen>
            </iframe>`
          : `<a href="${slide.youtubeLink}" target="_blank">
              <img src="${slide.image}" alt="${slide.title}" class="linked-image" />
            </a>`
      }
    </div>
    <div class="content-section">
      <div class="date">${slide.date}</div>
      <h1>${slide.title}</h1>
    </div>
  `;

  container.appendChild(slideEl);
});

// Observer for animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.slide').forEach(slide => observer.observe(slide));

// Optional Clock
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


