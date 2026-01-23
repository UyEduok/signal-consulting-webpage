/* ===========================
   GLOBAL NAV ELEMENTS 
  =============================*/
let navbar = document.getElementById("navbar");
let navSection = document.getElementById('navbarSection');
let menuToggle = document.getElementById("menuToggle");
let mobileMenu = document.getElementById("mobileMenu");
let closeMenu = document.getElementById("closeMenu");
let navElements = document.getElementById("navLinks"); 
let logo = document.getElementById("logo");
let navContainer = document.getElementById("nav-container");

let servicesBtn = document.getElementById("servicesBtn");
let servicesPanel = document.getElementById("servicesPanel");


function refreshNavRefs() {
  navbar = document.getElementById("navbar");
  navSection = document.getElementById('navbarSection');
  menuToggle = document.getElementById("menuToggle");
  mobileMenu = document.getElementById("mobileMenu");
  closeMenu = document.getElementById("closeMenu");
  navElements = document.getElementById("navLinks"); 
  logo = document.getElementById("logo");
  navContainer = document.getElementById("nav-container");
  servicesBtn = document.getElementById("servicesBtn");
  servicesPanel = document.getElementById("servicesPanel");
}


/* ===========================
   SERVICES POINTER
   =========================== */
function updateServicesPointer() {
  if (!servicesBtn || !servicesPanel) return;

  // 1st rAF: wait for class toggles to apply
  requestAnimationFrame(() => {
    // 2nd rAF: wait for absolute+transform centering to “settle”
    requestAnimationFrame(() => {
      const rect = servicesBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      servicesPanel.style.setProperty("--services-pointer-x", `${x}px`);
    });
  });
}


// Update pointer any time user opens/targets services
function attachServicesPointerListeners() {
  if (!servicesBtn) return;
  servicesBtn.addEventListener("mouseenter", updateServicesPointer);
  servicesBtn.addEventListener("focus", updateServicesPointer);
  servicesBtn.addEventListener("click", updateServicesPointer);
}



/* ===========================
   initActive Link And Dropdowns
   =========================== */
function initActiveLinkAndDropdowns() {
  const navLinks = document.querySelectorAll(".nav-links a");

  // Desktop Services wrapper/button
  const servicesDD = document.getElementById("servicesDD");
  const servicesBtnEl = document.getElementById("servicesBtn");

  // Mobile Services trigger/button
  const mobileServicesDD = document.getElementById("mobileServicesDD");
  const mobileServicesBtn = document.getElementById("mobileServicesBtn");
  const mobileServicesMenu = document.getElementById("mobileServicesMenu");


  function normalizePath(path) {
    const clean = path.split("?")[0].split("#")[0];

    // If the URL ends with "/", it's a directory. On GitHub Pages that means index.html.
    if (clean.endsWith("/")) return "index.html";

    const last = clean.substring(clean.lastIndexOf("/") + 1);

    // Extra safety: if there's no dot, it's not a filename (likely a folder)
    if (!last.includes(".")) return "index.html";

    return last;
  }

  function isServicesPage() {
    const currentFile = normalizePath(window.location.pathname);

    const serviceAnchors = [
      ...document.querySelectorAll("#servicesPanel a"),
      ...document.querySelectorAll("#mobileServicesMenu a"),
    ];

    return serviceAnchors.some((a) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return false;
      return normalizePath(href) === currentFile;
    });
  }

  function setActiveLink() {
    const currentFile = normalizePath(window.location.pathname);

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const linkFile = normalizePath(href);
      if (linkFile === currentFile) {
        link.classList.add("active");
      }
    });

    if (servicesBtnEl) {
      if (isServicesPage()) servicesBtnEl.classList.add("active");
      else servicesBtnEl.classList.remove("active");
    }

    if (mobileServicesBtn) {
      if (isServicesPage()) mobileServicesBtn.setAttribute("data-active", "true");
      else mobileServicesBtn.removeAttribute("data-active");
    }
  }

  setActiveLink();

  /* Mobile Services dropdown toggle */
  if (mobileServicesDD && mobileServicesBtn) {
    mobileServicesBtn.addEventListener("click", () => {
      const isOpen = mobileServicesDD.classList.toggle("open");
      mobileServicesBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    if (mobileServicesMenu) {
      mobileServicesMenu.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          mobileServicesDD.classList.remove("open");
          mobileServicesBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* Desktop click toggle for touch laptops */
  if (servicesDD && servicesBtnEl) {
    servicesBtnEl.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = servicesDD.classList.toggle("open");
      servicesBtnEl.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (isOpen) updateServicesPointer();
    });

    // Hover-open pointer
    servicesDD.addEventListener("mouseenter", updateServicesPointer);

    // Close desktop dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!servicesDD.contains(e.target)) {
        servicesDD.classList.remove("open");
        servicesBtnEl.setAttribute("aria-expanded", "false");
      }
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        servicesDD.classList.remove("open");
        servicesBtnEl.setAttribute("aria-expanded", "false");
      }
    });
  }

  updateServicesPointer();
}


/*=============================
  mobile button toggler
===============================*/
function attachMobileMenuListeners() {
  menuToggle = document.getElementById("menuToggle");
  mobileMenu = document.getElementById("mobileMenu");
  closeMenu = document.getElementById("closeMenu");

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  closeMenu?.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
}


/*=============================
  Load navbar to all html files
===============================*/
async function loadNavPartial() {
  if (!navSection) return;

  try {
    const res = await fetch("partials/nav.html", { cache: "no-cache" });
    if (!res.ok) return;

    navSection.innerHTML = await res.text();

    refreshNavRefs();
    attachServicesPointerListeners();
    attachMobileMenuListeners();

    initActiveLinkAndDropdowns();
    applyNavStateFromScroll();
    setTimeout(updateServicesPointer, 0);
  } catch (e) {}
}

/*=============================
  Load footer to all html files
===============================*/
async function loadFooterPartial() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  try {
    const res = await fetch("partials/footer.html", { cache: "no-cache" });
    if (!res.ok) return;

    footer.innerHTML = await res.text();
  } catch (e) {}
}


/* ===========================
   SCROLL BEHAVIOR (NAV STATES)
   =========================== */
function applyNavStateFromScroll() {
  const isScrolled = window.scrollY > 10;

  if (isScrolled) {
    navbar?.classList.add("scrolled");
    navElements?.classList.add("scrolled-color", "nav-link-scrolled");
    logo?.classList.add("show-logo");

    navContainer?.classList.remove("nav-container-center");
    navContainer?.classList.add("nav-container-scrolled");
  } else {
    navbar?.classList.remove("scrolled");
    navElements?.classList.remove("scrolled-color", "nav-link-scrolled");
    logo?.classList.remove("show-logo");

    navContainer?.classList.remove("nav-container-scrolled");
    navContainer?.classList.add("nav-container-center");
  }

  // Always reposition pointer after nav layout switches
  updateServicesPointer();
}

window.addEventListener("scroll", applyNavStateFromScroll);

/* Auto-close mobile menu when switching to desktop */
window.addEventListener("resize", () => {
  if (mobileMenu && window.innerWidth > 768 && mobileMenu.classList.contains("open")) {
    mobileMenu.classList.remove("open");
  }
  updateServicesPointer();
});




/* ===========================
   ACTIVE LINK + DROPDOWNS
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  loadNavPartial();
  loadFooterPartial()
  console.log("pathname:", window.location.pathname);
});



/* ===========================
   HERO ANIMATION + INITIAL NAV STATE
   =========================== */
window.addEventListener("load", () => {
  const heroText = document.querySelector(".hero-text");
  const heroLinks = document.querySelector(".hero-links");

  setTimeout(() => heroText?.classList.add("animate"), 300);
  setTimeout(() => heroLinks?.classList.add("animate"), 1200);

  // Ensure correct state on refresh
  applyNavStateFromScroll();

  // Fonts/animations can shift layout; re-measure once more
  setTimeout(updateServicesPointer, 300);
});


/* ===========================
   SCROLL TO SERVICES SECTION
   =========================== */
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToServices");
  const target = document.getElementById("Services-scroll");

  if (!scrollBtn || !target) return;

  scrollBtn.addEventListener("click", function () {
    const headerOffset = 10;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});


/* ===========================
   CONTACT FORM (EmailJS v4 + reCAPTCHA)
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const popup = document.getElementById("contact-popup");
  const popupMessage = document.getElementById("popup-message");
  const popupClose = document.getElementById("popup-close");
  const sendButton = form.querySelector("button[type='submit']");

  const canUsePopup = !!(popup && popupMessage && popupClose);

  const SERVICE_ID = "service_w9emfgl";
  const TEMPLATE_ID = "template_7n7qy9b";
  const PUBLIC_KEY = "JPNXLynMQIIkH4IYx";

  const MIN_INTERVAL = 30000;
  const WINDOW_MS = 5 * 60 * 1000;
  const MAX_SENDS_PER_WINDOW = 3;

  let lastSentTime = 0;
  let sendTimestamps = [];

  if (!sendButton) {
    console.error("Submit button not found inside .contact-form");
    return;
  }

  let popupOpen = false;

  const disableSendButton = () => (sendButton.disabled = true);
  const enableSendButton = () => (sendButton.disabled = false);

  const showMessage = (html) => {
    if (canUsePopup) {
      popupMessage.innerHTML = html;
      popup.classList.remove("hidden");
      popupOpen = true;
      disableSendButton();
    } else {
      alert(html.replace(/<[^>]*>/g, ""));
    }
  };

  const hidePopup = () => {
    if (!canUsePopup) return;
    popup.classList.add("hidden");
    popupOpen = false;
    enableSendButton();
  };

  if (canUsePopup) {
    popupClose.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      hidePopup();
    });
  }

  const sanitize = (input) => {
    const div = document.createElement("div");
    div.textContent = String(input ?? "");
    return div.innerHTML;
  };

  if (typeof emailjs === "undefined") {
    console.error("EmailJS SDK not loaded. Check script tag for @emailjs/browser@4.");
    showMessage("Email service is not available right now. Please try again later.");
    return;
  }

  try {
    emailjs.init({ publicKey: PUBLIC_KEY });
  } catch (err) {
    showMessage("Email service failed to initialize. Please try again later.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (popupOpen) return;

    const now = Date.now();
    sendTimestamps = sendTimestamps.filter((t) => now - t < WINDOW_MS);

    if (sendTimestamps.length >= MAX_SENDS_PER_WINDOW) {
      const waitMs = WINDOW_MS - (now - sendTimestamps[0]);
      const waitSec = Math.ceil(waitMs / 1000);
      showMessage(
        `You have reached the message limit. Please try again in about <strong>${waitSec}</strong> seconds.`
      );
      return;
    }

    if (now - lastSentTime < MIN_INTERVAL) {
      const waitSec = Math.ceil((MIN_INTERVAL - (now - lastSentTime)) / 1000);
      showMessage(`Please wait <strong>${waitSec}</strong> seconds before sending another message.`);
      return;
    }

    const nameEl = form.querySelector("#name");
    const emailEl = form.querySelector("#email");
    const phoneEl = form.querySelector("#phone");
    const messageEl = form.querySelector("#message");

    if (!nameEl || !emailEl || !messageEl) {
      showMessage("Form is misconfigured. Please contact the site owner.");
      return;
    }

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const phone = phoneEl ? phoneEl.value.trim() : "";
    const message = messageEl.value.trim();

    if (!name || !email || !message) {
      showMessage("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    if (typeof grecaptcha === "undefined") {
      showMessage("reCAPTCHA did not load. Please refresh the page.");
      return;
    }

    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      showMessage("Please complete the reCAPTCHA to continue.");
      return;
    }

    const templateParams = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone) || "N/A",
      message: sanitize(message),
    };

    disableSendButton();

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then((res) => {
        console.log("EmailJS SUCCESS:", res);

        lastSentTime = Date.now();
        sendTimestamps.push(lastSentTime);

        showMessage(
          `Hi <strong>${templateParams.name}</strong>, your message has been received! We will get back to you shortly.`
        );

        form.reset();
        try {
          grecaptcha.reset();
        } catch (err) {
          showMessage("Could not reset reCAPTCHA, please try again, if this persist please reach us directly via our email address or phone number");
        }
      })
      .catch((err) => {
        showMessage("Oops! Something went wrong. Please try again later.");
      });
  });
});
