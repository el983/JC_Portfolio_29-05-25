const slides = [
  {
    date: '30 June 2025',
    title: 'Welcome to My Portfolio',
    videoUrl: 'https://youtu.be/YZyiksDFbYg',
    youtubeLink: 'https://youtu.be/YZyiksDFbYg',
    // content: 'Explore breathtaking mountain ranges with our expert guides...'
  },
  {
    date: '9 June 2023',
    title: 'Being Resourceful',
    videoUrl: 'https://youtu.be/MkOE8p8tCzc',
    youtubeLink: 'https://youtu.be/MkOE8p8tCzc',
    // content: 'Experience vibrant city life through our curated urban adventures...'
  },
  {
    date: '3 March 2020',
    title: 'Beach Getaways',
    videoUrl: 'https://www.youtube.com/embed/0ogH7rYuVtM?enablejsapi=1&mute=1',
    youtubeLink: 'https://www.youtube.com/watch?v=0ogH7rYuVtM',
    content: 'Discover pristine beaches and tropical paradises...'
  },
  {
    date: '12 April 2020',
    title: 'Lakeside Retreats',
    videoUrl: 'https://www.youtube.com/embed/IUN664s7N-c',
    youtubeLink: 'https://www.youtube.com/watch?v=IUN664s7N-c',
    content: 'Find peace and tranquility at stunning lakeside locations...'
  }
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
      <p>${slide.content}</p>
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
