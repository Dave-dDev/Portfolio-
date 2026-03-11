/**
 * Personal Website Scripts
 * 2026 Sustainable Design Implementation
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initForm();
  initCustomCursor();
  initGsapAnimations();
});

/**
 * Theme Management
 */
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector("i");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const storedTheme = localStorage.getItem("theme");

  let isLight = storedTheme === "light" || (!storedTheme && prefersLight);

  function updateTheme() {
    document.body.setAttribute("data-theme", isLight ? "light" : "dark");
    if (icon) {
      icon.className = isLight ? "fas fa-sun" : "fas fa-moon";
    }
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  updateTheme();

  toggleBtn.addEventListener("click", () => {
    isLight = !isLight;
    updateTheme();
  });
}

/**
 * Custom Cursor Logic
 */
function initCustomCursor() {
  const cursor = document.querySelector(".cursor");

  if (!cursor) return;

  // Only hide default cursor if we have the custom one
  document.body.style.cursor = "none";

  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: "power2.out"
    });
  });

  const interactiveElements = document.querySelectorAll("a, button, .project-card, .skill-card");

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
      gsap.to(cursor, { scale: 3, duration: 0.3 });
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    });
  });
}

/**
 * GSAP & ScrollTrigger Animations
 */
function initGsapAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Staggered reveal for elements
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  revealElements.forEach((el) => {
    gsap.fromTo(el,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Parallax effect for project images
  const parallaxImages = document.querySelectorAll(".parallax-img");

  parallaxImages.forEach((img) => {
    gsap.to(img, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Hover effect via GSAP to avoid transition conflicts
    const card = img.closest('.project-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            gsap.to(img, { scale: 1.1, duration: 0.6, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        });
    }
  });

  // Special entrance for Hero Title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
      gsap.from(heroTitle, {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.2
      });
  }
}

/**
 * Form Validation & Interaction
 */
function initForm() {
  const form = document.getElementById("contact-form");
  const msgDiv = document.getElementById("form-message");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = "Sending...";
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = "Message Sent!";
        btn.style.backgroundColor = "#4CAF50";
        btn.style.color = "white";

        msgDiv.style.display = "block";
        msgDiv.style.color = "var(--color-accent)";
        msgDiv.textContent = `Thanks ${name}, I'll get back to you shortly.`;

        form.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.backgroundColor = "";
          btn.style.color = "";
          msgDiv.style.display = "none";
        }, 3000);
      }, 1500);
    }
  });
}
