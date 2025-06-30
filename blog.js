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
  // {
  //   date: '12 April 2020',
  //   title: 'Lakeside Retreats',
  //   videoUrl: 'https://www.youtube.com/embed/IUN664s7N-c',
  //   youtubeLink: 'https://www.youtube.com/watch?v=IUN664s7N-c',
  //   
  // },
  // {
  //     date: '2 September 2022',
  //   title: 'Technocrat 22 - Critical Thinking',
  //   videoUrl: 'https://www.youtube.com/embed/lRUJPp3IKF4?si=ZtF37uvz1Kv9Ux3K',
  //   youtubeLink: 'https://youtu.be/lRUJPp3IKF4?si=w4MJ3YS87UbDEy5e',
  // },
  // {
  //   date: '2 September 2022',
  //   title: 'Technocrat 22 - Critical Thinking',
  //   videoUrl: 'https://www.youtube.com/embed/lRUJPp3IKF4?si=ZtF37uvz1Kv9Ux3K',
  //   youtubeLink: 'https://youtu.be/lRUJPp3IKF4?si=w4MJ3YS87UbDEy5e',
  // },
];

const container = document.getElementById('slidesContainer');

slides.forEach((slide, index) => {
  const slideEl = document.createElement('div');
  slideEl.className = 'slide';
  slideEl.classList.add(index % 2 === 0 ? 'animate-left' : 'animate-right');

  slideEl.innerHTML = `
    <div class="video-section">
      <iframe 
        src="${slide.videoUrl}" 
        title="${slide.title}" 
        frameborder="0" 
        allowfullscreen>
      </iframe>
    </div>
    <div class="content-section">
      <div class="date">${slide.date}</div>
      <h1>${slide.title}</h1>
      
      <a href="${slide.youtubeLink}" target="_blank" class="btn">Watch on YouTube</a>
    </div>
  `;

  container.appendChild(slideEl);
});

// ✅ Observer that re-triggers animation on scroll
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
