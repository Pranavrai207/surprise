/* ==========================================================================
   ANNIVERSARY COUNTDOWN TIMER
   ========================================================================== */
const ANNIVERSARY_DATE = "June 22, 2026 00:00:00";

function initCountdown() {
  const countdownDate = new Date(ANNIVERSARY_DATE).getTime();
  const daysVal = document.getElementById("days");
  const hoursVal = document.getElementById("hours");
  const minutesVal = document.getElementById("minutes");
  const secondsVal = document.getElementById("seconds");
  const countdownContainer = document.getElementById("countdown");

  if (!daysVal) return; // Guard clause if countdown elements don't exist

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // If the countdown is finished, display celebratory text
    if (distance < 0) {
      clearInterval(interval);
      if (countdownContainer) {
        countdownContainer.innerHTML = `
          <div class="anniversary-celebration-banner" style="grid-column: span 4; padding: 20px; text-align: center;">
            <h3 style="font-family: var(--font-heading); color: var(--color-yellow-dark); font-size: 2rem; margin-bottom: 8px;">
              ✨ Happy 24th Marriage Anniversary! ✨
            </h3>
            <p style="color: var(--color-green-dark); font-weight: 600;">Girish & Rekha - Married June 22, 2002</p>
          </div>
        `;
      }
      return;
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the results with leading zero formatting
    daysVal.innerText = days.toString().padStart(2, '0');
    hoursVal.innerText = hours.toString().padStart(2, '0');
    minutesVal.innerText = minutes.toString().padStart(2, '0');
    secondsVal.innerText = seconds.toString().padStart(2, '0');
  }, 1000);
}

/* ==========================================================================
   MOBILE MENU / RESPONSIVE NAVIGATION
   ========================================================================== */
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-navigation");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!navToggle || !primaryNav) return;

  // Toggle navigation open/closed
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    
    navToggle.setAttribute("aria-expanded", !isExpanded);
    navToggle.classList.toggle("open");
    primaryNav.classList.toggle("open");
  });

  // Close navigation when clicking navigation links (mobile UX)
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Manage active state
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Close drawer menu
      if (primaryNav.classList.contains("open")) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("open");
        primaryNav.classList.remove("open");
      }
    });
  });

  // Highlight navigation link on scroll
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 200; // Offset for navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("data-sec") === current) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* ==========================================================================
   INTERACTIVE LOVE LETTERS (Envelopes)
   ========================================================================== */
function toggleEnvelope(envelopeId) {
  const selectedEnv = document.getElementById(envelopeId);
  if (!selectedEnv) return;

  const isOpen = selectedEnv.classList.contains("open");

  // Close all envelopes first for clean focus
  document.querySelectorAll(".envelope-wrapper").forEach(wrapper => {
    wrapper.classList.remove("open");
    const card = wrapper.querySelector(".envelope-card");
    if (card) card.setAttribute("aria-expanded", "false");
  });

  // Toggle selected envelope
  if (!isOpen) {
    selectedEnv.classList.add("open");
    const card = selectedEnv.querySelector(".envelope-card");
    if (card) card.setAttribute("aria-expanded", "true");
    
    // Smooth scroll envelope into view
    setTimeout(() => {
      selectedEnv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 400);
  }
}

// Add keyboard trigger for accessibility
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".envelope-card").forEach(card => {
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
});

/* ==========================================================================
   TIMELINE MEDIA LAUNCHER (Optional placeholder asset viewer)
   ========================================================================== */
// Standard placeholder files that the user will drop inside the assets folder
const GALLERY_PHOTOS = [
  { src: "./assets/1586274709860.jpg", title: "The Wedding Day", desc: "Married on June 22, 2002. A beautiful wedding ceremony starting a lifespan of love." },
  { src: "./assets/IMG-20210328-WA0013.jpg", title: "Our Sanctuary", desc: "Setting up their family home, building a nesting space filled with warmth, flowers, and joy." },
  { src: "./assets/IMG_20200510_120608.jpg", title: "Adventures of a Lifetime", desc: "Taking their children on scenic family roadtrips and exploring beautiful places together." },
  { src: "./assets/IMG-20210328-WA0016.jpg", title: "Laughter & Joy", desc: "Sharing small funny everyday candid moments, showing that partnership makes life light." },
  { src: "./assets/IMG_20240622_212138.jpg", title: "Steps to 25 Years", desc: "Approaching their 24th anniversary, celebrating the journey as they head toward the Silver Jubilee." },
  { src: "./assets/IMG-20210328-WA0014.jpg", title: "Eternal Companions", desc: "Girish & Rekha, walking hand-in-hand, supporting each other and inspiring everyone around them." }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  if (!lightbox || !lightboxImg || !lightboxCaption) return;

  currentLightboxIndex = index;
  const photo = GALLERY_PHOTOS[index];

  lightboxImg.src = photo.src;
  // If the image fails to load (because the user hasn't put the asset files in yet), show placeholder text
  lightboxImg.onerror = () => {
    lightboxImg.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'600' height%3D'400' viewBox%3D'0 0 600 400'%3E%3Crect width%3D'100%25' height%3D'100%25' fill%3D'%23FAFDFB'%2F%3E%3Ctext x%3D'50%25' y%3D'50%25' font-size%3D'20' text-anchor%3D'middle' font-family%3D'Georgia' fill%3D'%231b4332'%3E" + encodeURIComponent(photo.title) + " Placeholder (Add " + photo.src.split('/')[1] + " to assets/)%3C%2Ftext%3E%3C%2Fsvg%3E";
  };
  lightboxCaption.innerText = `${photo.title} (${photo.desc})`;
  
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
  }
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
  openLightbox(currentLightboxIndex);
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_PHOTOS.length;
  openLightbox(currentLightboxIndex);
}

// Close lightbox on click outside the image
document.getElementById("lightbox")?.addEventListener("click", (e) => {
  if (e.target.id === "lightbox") {
    closeLightbox();
  }
});

// Close/Navigate lightbox on Escape and Arrow Keys
document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox");
  if (lightbox && lightbox.classList.contains("show")) {
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") prevLightbox();
    else if (e.key === "ArrowRight") nextLightbox();
  }
});



/* ==========================================================================
   ANNIVERSARY WISHES BOARD (Local Storage Guestbook)
   ========================================================================== */
const DEFAULT_WISHES = [
  {
    name: "Aryan & Riya",
    relation: "Children",
    message: "Happy 24th Marriage Anniversary to the most supportive Mom & Dad in the world! Thank you for showing us what real unconditional love, loyalty, and patience look like every single day. Love you both to the moon and back!",
    date: new Date("2026-06-05T12:00:00Z").getTime()
  },
  {
    name: "Aunt Meera",
    relation: "Family",
    message: "Happy Anniversary dear Rekha and Girish! Warmest congratulations on building 24 years of beautiful memories, kids, and a loving home. May the upcoming Silver Jubilee bring even more blessings!",
    date: new Date("2026-06-05T10:30:00Z").getTime()
  },
  {
    name: "Amit Sharma",
    relation: "Friend",
    message: "Congratulations Girish and Rekha! 24 years is a massive milestone. I still remember your wedding day like it was yesterday—full of energy and smiles. Wishing you both a lifetime of good health and happiness.",
    date: new Date("2026-06-04T18:45:00Z").getTime()
  }
];

let activeFilter = "All";

function loadWishes() {
  const localWishes = JSON.parse(localStorage.getItem("anniversary_wishes")) || [];
  
  // Merge default wishes with local storage wishes, sorting by date descending
  let allWishes = [...localWishes, ...DEFAULT_WISHES];
  allWishes.sort((a, b) => b.date - a.date);

  const wallGrid = document.getElementById("wishes-wall-grid");
  if (!wallGrid) return;

  wallGrid.innerHTML = "";

  const filteredWishes = allWishes.filter(wish => {
    return activeFilter === "All" || wish.relation === activeFilter;
  });

  if (filteredWishes.length === 0) {
    wallGrid.innerHTML = `
      <div class="wishes-empty-state">
        <i class="fas fa-sticky-note empty-state-icon"></i>
        <p>No wishes in this category yet. Be the first to leave one!</p>
      </div>
    `;
    return;
  }

  filteredWishes.forEach(wish => {
    const card = document.createElement("div");
    card.className = "wish-card";
    
    // Assign relationship CSS tag class
    let relClass = "rel-well-wisher";
    if (wish.relation === "Children") relClass = "rel-children";
    else if (wish.relation === "Family") relClass = "rel-family";
    else if (wish.relation === "Friend") relClass = "rel-friend";

    // Escape HTML to prevent XSS injection
    const escapedName = escapeHTML(wish.name);
    const escapedMsg = escapeHTML(wish.message);

    card.innerHTML = `
      <p class="wish-message-text">"${escapedMsg}"</p>
      <div class="wish-card-footer">
        <span class="wish-author">${escapedName}</span>
        <span class="wish-relationship ${relClass}">${wish.relation}</span>
      </div>
    `;
    wallGrid.appendChild(card);
  });
}

function handleWishSubmit(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById("wish-name");
  const relationInput = document.getElementById("wish-relation");
  const messageInput = document.getElementById("wish-message");

  let isValid = true;

  // Name Validation
  if (!nameInput.value.trim()) {
    nameInput.classList.add("invalid");
    isValid = false;
  } else {
    nameInput.classList.remove("invalid");
  }

  // Relation Validation
  if (!relationInput.value) {
    relationInput.classList.add("invalid");
    isValid = false;
  } else {
    relationInput.classList.remove("invalid");
  }

  // Message Validation
  if (!messageInput.value.trim()) {
    messageInput.classList.add("invalid");
    isValid = false;
  } else {
    messageInput.classList.remove("invalid");
  }

  if (!isValid) return;

  // Form Submission State UX
  const submitBtn = document.getElementById("submit-wish-btn");
  const btnText = document.getElementById("submit-btn-text");
  const btnSpinner = document.getElementById("submit-btn-spinner");
  
  submitBtn.disabled = true;
  btnText.classList.add("hidden");
  btnSpinner.classList.remove("hidden");

  // Create wish object
  const newWish = {
    name: nameInput.value.trim(),
    relation: relationInput.value,
    message: messageInput.value.trim(),
    date: new Date().getTime()
  };

  // Simulate network request delay (1 second) for premium product feel
  setTimeout(() => {
    // Save to Local Storage
    const localWishes = JSON.parse(localStorage.getItem("anniversary_wishes")) || [];
    localWishes.push(newWish);
    localStorage.setItem("anniversary_wishes", JSON.stringify(localWishes));

    // Reset Form UI
    document.getElementById("wish-form").reset();
    submitBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnSpinner.classList.add("hidden");

    // Show Success alerts
    const successAlert = document.getElementById("form-success");
    successAlert.classList.remove("hidden");
    
    // Refresh Wish list
    loadWishes();

    // Hide success alert after 5 seconds
    setTimeout(() => {
      successAlert.classList.add("hidden");
    }, 5000);
  }, 1200);
}

function filterWishes(category) {
  activeFilter = category;
  
  // Manage tab button states
  const tabs = document.querySelectorAll(".board-tab");
  tabs.forEach(tab => tab.classList.remove("active"));

  if (category === "All") document.getElementById("tab-all").classList.add("active");
  else if (category === "Children") document.getElementById("tab-children").classList.add("active");
  else if (category === "Family") document.getElementById("tab-family").classList.add("active");
  else if (category === "Friend") document.getElementById("tab-friend").classList.add("active");

  loadWishes();
}

// Helper to escape HTML tags for safety
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================================
   FLOATING AUDIO PLAYER CONTROLS
   ========================================================================== */
function initAudioPlayer() {
  const audio = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("audio-toggle");
  const audioIcon = document.getElementById("audio-icon");
  const widget = document.getElementById("audio-widget");
  const info = document.getElementById("audio-info");

  if (!audio || !toggleBtn || !audioIcon) return;

  // Play / Pause toggle click
  toggleBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        audioIcon.className = "fas fa-pause playing";
        widget.classList.add("expanded");
        info.querySelector(".music-status").innerText = "Playing";
      }).catch(err => {
        console.error("Audio playback blocked by browser security.", err);
      });
    } else {
      audio.pause();
      audioIcon.className = "fas fa-music";
      info.querySelector(".music-status").innerText = "Paused";
    }
  });
}

/* ==========================================================================
   HIGH PERFORMANCE CANVAS FALLING PETALS ANIMATION
   ========================================================================== */
function initFallingPetals() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;

  // Ensure canvas is visible on refresh/re-run
  canvas.style.opacity = '1';

  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const numParticles = 40;
  const particles = [];
  let animationActive = true;

  // Rose Petals & Green Leaf Color schemes
  const colorPalettes = [
    { fill: "rgba(255, 183, 3, 0.65)", stroke: "rgba(230, 150, 0, 0.4)" }, // Warm yellow petal
    { fill: "rgba(254, 250, 224, 0.75)", stroke: "rgba(216, 210, 180, 0.4)" }, // Cream white petal
    { fill: "rgba(82, 183, 136, 0.45)", stroke: "rgba(45, 106, 79, 0.3)" }  // Mint green leaf
  ];

  class Petal {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // Distribute vertically on start
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.size = Math.random() * 10 + 8;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationDistance = Math.random() * 30 + 10;
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.02 - 0.01;
      this.oscillationOffset = Math.random() * Math.PI;
      this.color = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    }

    update() {
      this.y += this.speedY;
      this.angle += this.rotationSpeed;
      
      // Floating wave sway using Sine
      this.x += this.speedX + Math.sin(this.y * this.oscillationSpeed + this.oscillationOffset) * 0.3;

      // Reset when falling out of bounds
      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // Draw stylized organic leaf/petal shape
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = this.color.fill;
      ctx.fill();
      ctx.strokeStyle = this.color.stroke;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }
  }

  // Populate particles
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Petal());
  }

  // Animation Loop
  function animate() {
    if (!animationActive) return;

    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  // Set timeout to fade out canvas after 10 seconds
  setTimeout(() => {
    canvas.style.opacity = '0';
    // Wait for the opacity fade transition (1.5s) to complete, then halt the animation loop
    setTimeout(() => {
      animationActive = false;
    }, 1500);
  }, 10000); // 10000ms = 10s

  // Respect prefers-reduced-motion
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!mediaQuery.matches) {
    animate();
  }
}

/* ==========================================================================
   SCROLL REVEAL (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const observerOptions = {
    root: null,
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Animate once only
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   LOVE VIDEO MODAL SURPRISE
   ========================================================================== */
function initVideoModal() {
  const playBtn = document.getElementById("play-video-heart");
  const modal = document.getElementById("video-modal");
  const closeBtn = document.getElementById("close-video-modal");
  const video = document.getElementById("anniversary-video");
  const audio = document.getElementById("bg-music");
  const audioIcon = document.getElementById("audio-icon");
  const audioInfo = document.getElementById("audio-info");

  if (!playBtn || !modal || !closeBtn || !video) return;

  let audioWasPlaying = false;

  // Open modal and play video
  playBtn.addEventListener("click", () => {
    modal.classList.add("show");
    
    // Play video
    video.play().catch(err => {
      console.log("Video playback blocked by browser security.", err);
    });

    // Pause background music if it is active to avoid overlay sound
    if (audio && !audio.paused) {
      audio.pause();
      audioWasPlaying = true;
      if (audioIcon) audioIcon.className = "fas fa-music";
      if (audioInfo) audioInfo.querySelector(".music-status").innerText = "Paused (Video Playing)";
    }
  });

  // Close modal and stop video
  function closeModal() {
    modal.classList.remove("show");
    video.pause();
    video.currentTime = 0; // Rewind

    // Resume background music if it was paused
    if (audioWasPlaying && audio) {
      audio.play().then(() => {
        if (audioIcon) audioIcon.className = "fas fa-pause playing";
        if (audioInfo) audioInfo.querySelector(".music-status").innerText = "Playing";
      }).catch(err => {
        console.log("Audio resume blocked.", err);
      });
      audioWasPlaying = false;
    }
  }

  closeBtn.addEventListener("click", closeModal);

  // Close by clicking background overlay
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close by hitting Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   INITIALIZE ALL MODULES ON DOM CONTENT LOADED
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  initNavigation();
  initAudioPlayer();
  initVideoModal();
  loadWishes();
  initFallingPetals();
  initScrollReveal();
  
  // Attach wishes form listener
  const wishForm = document.getElementById("wish-form");
  if (wishForm) {
    wishForm.addEventListener("submit", handleWishSubmit);
  }
});
