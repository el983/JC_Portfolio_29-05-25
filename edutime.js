const slides = [
  {
    content1:"Group Vice-President - New Initiatives",
    content2:"HERALD GROUP",
    className:"slide-style-1"
  },
  
  
  {
   
    content1: "PhD Emotional Intelligence",
    content2:"Atlantic International University"
  },
  {
    
    content1: "Post Graduate Program on Strategic HR & Leadership<br>",
     content2:"XLRI"
  },
  {
   
    content1: "Masters in Psychology",
    content2:"Vinayak Mission University"
  },
  {
    
    content1: "Masters in Business Management<br>",
    content2:"Neptune Institute of Management"
  },
  
];



const container = document.getElementById('slidesContainer');

slides.forEach((slide, index) => {
  const slideEl = document.createElement('div');
  slideEl.className = 'slide';
  slideEl.classList.add(index % 2 === 0 ? 'animate-left' : 'animate-right');

  if (slide.className) {
    slideEl.classList.add(slide.className);
  }

  slideEl.innerHTML = `
   
    <div class="content-section">
      <p class="first">${slide.content1}</p>
      <p class="second">${slide.content2}</p>
      
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
