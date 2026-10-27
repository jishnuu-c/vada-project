import { menuItems } from "./data/menuData.js";
import { shopConfig } from "./data/shopConfig.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderMenu();
  renderContactInfo();
  initGalleryLightbox();
  initSmoothScroll();
});

/* HEADER & MOBILE NAVIGATION */
function initNavbar() {
  const header = document.querySelector(".site-header");
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-drawer .btn");

  // Scroll shadow effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileDrawer?.classList.contains("active");
    mobileToggle?.classList.toggle("active", isOpen);
    mobileDrawer?.classList.toggle("active", isOpen);
    mobileOverlay?.classList.toggle("active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  mobileToggle?.addEventListener("click", () => toggleMenu());
  mobileOverlay?.addEventListener("click", () => toggleMenu(false));
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });
}

/* RENDER SIGNATURE MENU */
function renderMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;

  container.innerHTML = menuItems.map(item => {
    // Only show price if explicitly configured
    const priceHtml = (item.price !== null && item.price !== undefined && item.price !== "")
      ? `<span class="menu-card-price">${typeof item.price === "number" ? `₹${item.price}` : item.price}</span>`
      : "";

    return `
      <article class="menu-card" data-category="${item.category}">
        <div class="menu-card-image-wrap">
          <img 
            src="${item.image}" 
            alt="${item.nameMalayalam} - ${item.englishSubtitle}" 
            class="menu-card-image"
            width="600"
            height="400"
          />
          ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ""}
        </div>
        <div class="menu-card-content">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.nameMalayalam}</h3>
            ${priceHtml}
          </div>
          <div class="menu-card-subtitles">
            <span class="menu-card-tamil">${item.nameTamil}</span>
            <span class="menu-card-bullet">•</span>
            <span class="menu-card-en">${item.englishSubtitle}</span>
          </div>
          <p class="menu-card-desc">${item.descriptionMalayalam}</p>
          <div class="menu-card-footer">
            <span class="menu-card-tag">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              തനത് നാടൻ രുചി
            </span>
            <span class="tamil-text" style="color: var(--color-muted-gold); font-size: 0.85rem; font-weight: 600;">சுடச்சுட</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* RENDER VISIT & CONTACT DETAILS */
function renderContactInfo() {
  const detailsList = document.getElementById("visitDetailsList");
  const actionsBar = document.getElementById("visitActionsBar");
  const footerContact = document.getElementById("footerContactDetails");

  if (!detailsList || !actionsBar) return;

  const details = [];
  const actions = [];
  const footerItems = [];

  // Opening Hours (if configured)
  if (shopConfig.openingHours && shopConfig.openingHours.isConfigured && shopConfig.openingHours.timingMalayalam) {
    details.push(`
      <div class="visit-detail-item">
        <div class="visit-detail-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="visit-detail-content">
          <span class="visit-detail-label">പ്രവർത്തന സമയം</span>
          <span class="visit-detail-value">${shopConfig.openingHours.timingMalayalam}</span>
          <span class="visit-detail-sub">${shopConfig.openingHours.daysMalayalam} (${shopConfig.openingHours.timingEnglish})</span>
        </div>
      </div>
    `);

    footerItems.push(`
      <li class="footer-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>${shopConfig.openingHours.daysMalayalam}: ${shopConfig.openingHours.timingMalayalam}</span>
      </li>
    `);
  }

  // Address (Only show if actually configured)
  const hasAddress = shopConfig.address && (shopConfig.address.line1 || shopConfig.address.city);
  if (hasAddress) {
    const fullAddress = [
      shopConfig.address.line1,
      shopConfig.address.line2,
      shopConfig.address.city,
      shopConfig.address.state,
      shopConfig.address.pincode
    ].filter(Boolean).join(", ");

    details.push(`
      <div class="visit-detail-item">
        <div class="visit-detail-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="visit-detail-content">
          <span class="visit-detail-label">ഞങ്ങളുടെ മേൽവിലാസം</span>
          <span class="visit-detail-value">${fullAddress}</span>
          ${shopConfig.address.landmark ? `<span class="visit-detail-sub">ലാൻഡ്‌മാർക്ക്: ${shopConfig.address.landmark}</span>` : ""}
        </div>
      </div>
    `);

    footerItems.push(`
      <li class="footer-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>${fullAddress}</span>
      </li>
    `);
  }

  // Phone (Only show if configured)
  if (shopConfig.phone && shopConfig.phone.trim() !== "") {
    details.push(`
      <div class="visit-detail-item">
        <div class="visit-detail-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <div class="visit-detail-content">
          <span class="visit-detail-label">ഫോൺ നമ്പർ</span>
          <a href="tel:${shopConfig.phone}" class="visit-detail-value" style="color: var(--color-primary-green);">
            ${shopConfig.phone}
          </a>
          <span class="visit-detail-sub">ഓർഡറുകൾക്കും വിവരങ്ങൾക്കും വിളിക്കാം</span>
        </div>
      </div>
    `);

    actions.push(`
      <a href="tel:${shopConfig.phone}" class="btn btn-secondary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        വിളിക്കുക
      </a>
    `);

    footerItems.push(`
      <li class="footer-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <a href="tel:${shopConfig.phone}">${shopConfig.phone}</a>
      </li>
    `);
  }

  // WhatsApp (Only show if configured)
  if (shopConfig.whatsapp && shopConfig.whatsapp.trim() !== "") {
    actions.push(`
      <a href="https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent('ഹലോ മണിവട, എനിക്ക് നിങ്ങളുടെ ചായയും പലഹാരങ്ങളും ഓർഡർ ചെയ്യണം.')}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 2C6.5 2 2 6.5 2 12.031c0 1.906.531 3.703 1.516 5.25L2 22l4.875-1.5c1.516.906 3.266 1.406 5.156 1.406 5.531 0 10.031-4.5 10.031-10.031 0-5.531-4.5-9.875-10.031-9.875zm5.859 14.156c-.25.703-1.453 1.344-2.031 1.422-.531.078-1.219.109-3.953-1.016-3.328-1.375-5.469-4.781-5.641-5-.156-.219-1.359-1.813-1.359-3.453s.859-2.453 1.172-2.781c.297-.328.656-.406.875-.406.219 0 .438 0 .625.016.203.016.484-.078.75.563.281.688.953 2.344 1.031 2.516.094.172.156.391.031.625-.109.25-.172.391-.344.609-.172.203-.359.453-.516.609-.172.172-.344.359-.156.703.203.328.891 1.484 1.922 2.406 1.328 1.188 2.453 1.547 2.813 1.719.344.172.563.141.766-.094.219-.25.922-1.078 1.172-1.453.25-.375.484-.313.828-.188.344.125 2.188 1.031 2.563 1.219.375.188.625.281.719.438.094.172.094.969-.156 1.672z"/>
        </svg>
        WhatsApp ചാറ്റ്
      </a>
    `);
  }

  // Google Maps (Only show if configured)
  if (shopConfig.googleMapsUrl && shopConfig.googleMapsUrl.trim() !== "") {
    actions.push(`
      <a href="${shopConfig.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
        </svg>
        കടയിലേക്കുള്ള വഴി
      </a>
    `);
  } else {
    // Default safe action: scroll to menu
    actions.push(`
      <a href="#menu" class="btn btn-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
        ഞങ്ങളുടെ മെനു കാണാം
      </a>
    `);
  }

  detailsList.innerHTML = details.join("");
  actionsBar.innerHTML = actions.join("");

  if (footerContact && footerItems.length > 0) {
    footerContact.innerHTML = footerItems.join("");
  }
}

/* GALLERY LIGHTBOX */
function initGalleryLightbox() {
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector(".gallery-image");
      const title = item.querySelector(".gallery-overlay-title")?.textContent || "";
      const sub = item.querySelector(".gallery-overlay-sub")?.textContent || "";
      
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption) {
          lightboxCaption.innerHTML = `<strong>${title}</strong><div style="font-size: 0.9rem; opacity: 0.8; margin-top: 4px;">${sub}</div>`;
        }
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

/* SMOOTH SCROLLING */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
