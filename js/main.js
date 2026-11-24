/* ==========================================================================
   Paramparik Collection — Interactive JavaScript
   Extracted & rebuilt from your original Airo application
   ========================================================================== */

const NEHA_WHATSAPP = "917887976067"; // Exact WhatsApp number from your original site (+91 7887976067)

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initHeroCarousel();
  initScrollReveal();
  initGalleryFilters();
  initLightbox();
  initPasswordToggles();
  initAuthHandlers();
});

// 1. Sticky Header Elevation on Scroll
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// 2. Mobile Navigation Drawer
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

// 3. Hero Slideshow Carousel (3 Slides matching hero-1, hero-2, hero-3)
function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length <= 1) return;

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 5000);
}

// 4. IntersectionObserver Scroll Reveal
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
}

// 5. Gallery Category Filter Pills + Hash Deep-Linking (#nath, #bindi, #bangles, #earrings)
function initGalleryFilters() {
  const pills = document.querySelectorAll(".filter-pill");
  const sections = document.querySelectorAll(".gallery-band[data-category]");
  if (!pills.length || !sections.length) return;

  const applyCategory = (cat) => {
    pills.forEach((p) => p.classList.toggle("active", p.dataset.filter === cat));
    sections.forEach((sec) => {
      sec.style.display = cat === "all" || sec.dataset.category === cat ? "block" : "none";
    });
  };

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const selected = pill.dataset.filter;
      applyCategory(selected);
      if (selected !== "all") {
        history.replaceState(null, "", `#${selected}`);
      } else {
        history.replaceState(null, "", window.location.pathname);
      }
    });
  });

  const initialHash = window.location.hash.replace("#", "").toLowerCase();
  if (["nath", "bindi", "bangles", "earrings"].includes(initialHash)) {
    applyCategory(initialHash);
  }
}

// 6. Gallery & Highlight Lightbox Zoom Modal with Direct WhatsApp Enquiry
function initLightbox() {
  const zoomables = document.querySelectorAll("[data-lightbox-src]");
  if (!zoomables.length) return;

  let modal = document.getElementById("lightboxModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "lightboxModal";
    modal.className = "lightbox-modal";
    modal.innerHTML = `
      <div class="lightbox-box">
        <button class="lightbox-close" aria-label="Close preview">✕</button>
        <img id="lightboxImg" src="" alt="" />
        <div class="lightbox-footer">
          <div>
            <h3 id="lightboxTitle" style="font-size:1.35rem;color:hsl(var(--maroon-deep));"></h3>
            <p style="font-size:0.82rem;color:hsl(var(--gold-dark));letter-spacing:0.12em;text-transform:uppercase;">Handcrafted by Neha Borole</p>
          </div>
          <a id="lightboxWaBtn" href="#" target="_blank" rel="noopener noreferrer" class="btn-maroon-solid">
            💬 Enquire on WhatsApp
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest(".lightbox-close")) {
        modal.classList.remove("open");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") modal.classList.remove("open");
    });
  }

  const imgEl = document.getElementById("lightboxImg");
  const titleEl = document.getElementById("lightboxTitle");
  const waBtn = document.getElementById("lightboxWaBtn");

  zoomables.forEach((card) => {
    card.addEventListener("click", () => {
      const src = card.dataset.lightboxSrc;
      const title = card.dataset.lightboxTitle || "Paramparik Jewellery Piece";
      imgEl.src = src;
      imgEl.alt = title;
      titleEl.textContent = title;
      const msg = encodeURIComponent(
        `Namaste Neha! I saw "${title}" in the Paramparik Collection gallery and would love to know more details.`
      );
      waBtn.href = `https://wa.me/${NEHA_WHATSAPP}?text=${msg}`;
      modal.classList.add("open");
    });
  });
}

// 7. Password Show / Hide Toggle
function initPasswordToggles() {
  document.querySelectorAll(".eye-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      if (!input) return;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  });
}

// 8. Login & Registration via WhatsApp (+91 7887976067)
function initAuthHandlers() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const mobile = document.getElementById("login-mobile").value.trim();
      const password = document.getElementById("login-password").value;

      if (!/^[0-9]{10}$/.test(mobile)) {
        showToast("Please enter a valid 10-digit mobile number.");
        return;
      }
      if (!password) {
        showToast("Please enter your password.");
        return;
      }

      const text = encodeURIComponent(
        `Hello Paramparik Collection! I would like to sign in to my account.\nMobile Number: ${mobile}`
      );
      showToast("Opening WhatsApp to verify your login...");
      setTimeout(() => {
        window.open(`https://wa.me/${NEHA_WHATSAPP}?text=${text}`, "_blank", "noopener,noreferrer");
      }, 600);
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const address = document.getElementById("signup-address").value.trim();
      const mobile = document.getElementById("signup-mobile").value.trim();
      const pass = document.getElementById("signup-password").value;
      const confirm = document.getElementById("signup-confirm").value;

      if (!name || !address) {
        showToast("Please enter your full name and address.");
        return;
      }
      if (!/^[0-9]{10}$/.test(mobile)) {
        showToast("Please enter a valid 10-digit mobile number.");
        return;
      }
      if (pass.length < 6) {
        showToast("Password must be at least 6 characters.");
        return;
      }
      if (pass !== confirm) {
        showToast("Passwords do not match.");
        return;
      }

      const text = encodeURIComponent(
        `Hello Paramparik Collection! New Account Registration:\n• Name: ${name}\n• Mobile: ${mobile}\n• Address: ${address}`
      );
      showToast("Opening WhatsApp to complete registration...");
      setTimeout(() => {
        window.open(`https://wa.me/${NEHA_WHATSAPP}?text=${text}`, "_blank", "noopener,noreferrer");
      }, 600);
    });
  }
}

// Graceful offline SVG fallback if an external photo fails to load
function imgFallback(img, label) {
  img.onerror = null;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#3a0910"/>
    <rect x="20" y="20" width="560" height="560" fill="none" stroke="#c99e48" stroke-width="2"/>
    <text x="300" y="290" fill="#e2ba64" font-family="Georgia, serif" font-size="22" text-anchor="middle">${label}</text>
    <text x="300" y="325" fill="#faf5eb" font-family="sans-serif" font-size="11" letter-spacing="3" text-anchor="middle">PARAMPARIK COLLECTION</text>
  </svg>`;
  img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function showToast(msg) {
  let el = document.querySelector(".toast-banner");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast-banner";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 3200);
}
