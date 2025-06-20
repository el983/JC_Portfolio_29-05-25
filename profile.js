const panels = [
    {
        img: "assets/5.jpeg",
        heading: "EDUCATOR",
        // paragraph: "Explore how creativity shapes our designs and concepts."
    },
    {
        img: "assets/b5.jpeg",
        heading: "An Educator Committed to Transformative Learning ",
        paragraph: "Joy Chowdhury stands out as a dynamic educator whose approach transcends traditional teaching. With a deep foundation in learning & development, he brings an integrated philosophy that blends emotional intelligence, strategic thinking, and real-world application. His classroom—whether physical or virtual—is a space of reflection, interaction, and empowerment. \n \n What distinguishes Joy is his ability to connect with learners across disciplines and backgrounds. He doesn’t just deliver content—he facilitates discovery. His sessions are known for their energy, clarity, and relevance, often punctuated with stories, practical insights, and relatable case studies. As an educator, Joy believes in unlocking potential rather than just delivering information. He actively mentors young professionals, nurtures curiosity in students, and supports educators in reimagining their own roles. \n \n Whether guiding students through personal growth, preparing them for the workplace, or training future leaders, Joy Chowdhury remains committed to his core belief: education is not the filling of a pail, but the lighting of a fire."
    },
    {
        img: "assets/client5.jpeg",
        heading: "LEADERSHIP COACH",
        // paragraph: "See what our clients say about the experience."
    },
    {
        img: "assets/b5.jpeg",
        heading: "Leadership and Emotional Intelligence Coach",
        paragraph: "Joy Chowdhury is a transformational Leadership and Emotional Intelligence (EI) Coach, widely respected for his ability to bring clarity, confidence, and consciousness into leadership development. With a unique blend of strategic insight and human-centric coaching, Joy empowers professionals and organizations to lead with purpose, empathy, and resilience. \n \n As a coach, he focuses on the person behind the professional—helping leaders understand their emotional triggers, build self-awareness, manage interpersonal dynamics, and cultivate influence without authority. His coaching approach is experiential and reflective, often using storytelling, behavioural tools, and real-life challenges to guide clients toward sustainable change. \n \n Joy has worked with senior executives, educators, and emerging leaders across South Asia, particularly in fast-growing institutions in Nepal and India. Whether in a boardroom, a school leadership retreat, or a one-on-one session, he fosters trust and growth with authenticity and insight. His coaching mantra is simple yet powerful: lead people, not just projects—a belief that underscores every engagement he undertakes.\n \n Through his work, Joy Chowdhury continues to shape emotionally intelligent leaders who are not only effective in performance but deeply connected to their teams, communities, and values."
    },
    {
        img: "assets/client7.jpeg",
        heading: "STRATEGIC LEADER",
        // paragraph: "Creative solutions for everyday challenges."
    },
    {
        img: "assets/b5.jpeg",
        heading: "A Strategic Leader with Vision and Impact",
        paragraph: "Joy Chowdhury is widely recognized as a forward-thinking strategic leader who combines deep insight with actionable foresight. With a career rooted in learning, development, and institutional transformation, Joy brings clarity and purpose to complex challenges across educational, corporate, and developmental sectors. \n \n As a strategic leader, he is known for aligning vision with execution. Whether designing large-scale training ecosystems, leading capacity-building initiatives, or advising academic institutions, Joy demonstrates a rare ability to balance innovation with practicality. His leadership style is inclusive, data-informed, and anchored in long-term impact. \n \n Joy's strategic acumen is especially visible in his work with universities and organizations across India and Nepal, where he has led programs that build future-ready talent, institutional resilience, and leadership pipelines. He believes strategy should not only serve goals but also inspire people—and he models that belief by mentoring others to think systemically and act with intent.\n\n In every leadership role, Joy Chowdhury stands as a catalyst for change—shaping not just strategies, but cultures that thrive."
    },
    {
        img: "assets/client9.jpeg",
        heading: "MOTIVATIONAL SPEAKER",
        // paragraph: "Telling stories through dynamic images."
    },
    {
        img: "assets/b5.jpeg",
        heading: "A Motivational Speaker Who Inspires with Purpose",
        paragraph: "Joy Chowdhury is a dynamic motivational speaker known for his ability to move hearts, spark minds, and inspire action. With a natural gift for storytelling and a deep understanding of human motivation, Joy connects with audiences across age groups and professions—igniting a sense of purpose, confidence, and self-belief. \n \n Whether addressing students, educators, professionals, or leaders, Joy brings a blend of warmth, wisdom, and practicality to the stage. His talks go beyond clichés, drawing from real-life experiences, transformative journeys, and the power of emotional intelligence to help people discover their true potential.\n \n What sets him apart is his authenticity and clarity. Audiences leave his sessions not only motivated but equipped—with tools for growth, a fresh perspective, and a renewed commitment to personal excellence. Across India, Nepal, and beyond, Joy Chowdhury continues to empower individuals to rise above limitations and lead with courage, conviction, and compassion."
    }
];

let currentIndex = 0;
const angle = 230 / (panels.length - 1);
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
        panel.style.backgroundImage = `url(${panelData.img})`;

        const rotation = offset * angle;
        const scale = isFocused ? 1 : 0.8;
        const isEven = (index + 1) % 2 === 0;

        panel.style.width = isEven ? "40vw" : "180px";
        panel.style.height = "70%";
        panel.style.transform = `rotateY(${rotation}deg) ${getTranslateZ()} scale(${scale})`;

        if (!isEven) {
            const heading = document.createElement("h2");
            heading.textContent = panelData.heading;
            heading.className = "panel-heading";
            panel.appendChild(heading);
        }

        if (isEven) {
            const heading = document.createElement("h2");
            heading.textContent = panelData.heading;
            heading.className = "panel-heading";
            panel.appendChild(heading);
            const para = document.createElement("p");
            // para.textContent = panelData.paragraph;
            para.innerHTML = panelData.paragraph.replace(/\n/g, "<br>");
            para.className = "panel-paragraph";
            panel.appendChild(para);
        }

        gallery.appendChild(panel);
    });

    const bg = document.getElementById("background-blur");
    bg.style.backgroundImage = `url(${panels[currentIndex].img})`;
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

    if (now - lastScrollTime < 500) return;

    if (e.deltaY > 0) {
        handleNext();
    } else if (e.deltaY < 0) {
        handlePrev();
    }

    lastScrollTime = now;
    e.preventDefault();
}

window.addEventListener("wheel", handleWheelScroll, { passive: false });
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("mouseup", handleMouseUp);
window.addEventListener("touchstart", handleTouchStart);
window.addEventListener("touchmove", handleTouchMove);
window.addEventListener("touchend", handleTouchEnd);
window.addEventListener("load", renderGallery);
window.addEventListener("resize", renderGallery);

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

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = Math.round((scrollTop / totalHeight) * 100);

  document.getElementById("scrollPercent").textContent = `${scrollPercent}%`;
});
