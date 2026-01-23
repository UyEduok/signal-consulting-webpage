const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.querySelectorAll(".nav-links a");
const closeMenu = document.getElementById("closeMenu");
const navElements = document.getElementById("navLinks");
const logo = document.getElementById("logo");
const navContainer = document.getElementById("nav-container");


const servicesBtn = document.getElementById("servicesBtn");
const servicesPanel = document.getElementById("servicesPanel");

if (servicesBtn) {
  servicesBtn.addEventListener("mouseenter", updateServicesPointer);
  servicesBtn.addEventListener("focus", updateServicesPointer);
  servicesBtn.addEventListener("click", updateServicesPointer);
}


function updateServicesPointer() {
  if (!servicesBtn || !servicesPanel) return;

  const btnRect = servicesBtn.getBoundingClientRect();
  const pointerX = btnRect.left + btnRect.width / 2;

  servicesPanel.style.setProperty(
    "--services-pointer-x",
    `${pointerX}px`
  );
}


/* Scroll behavior */
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
        navElements.classList.add("scrolled-color","nav-link-scrolled");
        logo.classList.add("show-logo");

        navContainer.classList.remove("nav-container-center");
        navContainer.classList.add("nav-container-scrolled");

        servicesPanel.classList.add("services-panel--scrolled");
        servicesPanel.classList.remove("services-panel--centered");
        updateServicesPointer()
    } else {
        navbar.classList.remove("scrolled");
        navElements.classList.remove("scrolled-color", "nav-link-scrolled");
        logo.classList.remove("show-logo");

        navContainer.classList.remove("nav-container-scrolled")
        navContainer.classList.add("nav-container-center");

        servicesPanel.classList.remove("services-panel--scrolled");
        servicesPanel.classList.add("services-panel--centered");
        updateServicesPointer()
    }
});


/* CODE FOR NAVBAR SECTION */

/* Auto-close mobile menu when switching to desktop */
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && mobileMenu.classList.contains("open")) {
    mobileMenu.classList.remove("open");
  }
  updateServicesPointer()
});

/* Mobile menu toggle */
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

/* Active link handling + Services dropdown handling */
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");

  // Desktop Services trigger/button
  const servicesDD = document.getElementById("servicesDD");
  const servicesBtnE1 = document.getElementById("servicesBtn");

  // Mobile Services trigger/button
  const mobileServicesDD = document.getElementById("mobileServicesDD");
  const mobileServicesBtn = document.getElementById("mobileServicesBtn");
  const mobileServicesMenu = document.getElementById("mobileServicesMenu");

  function normalizePath(path) {
    const clean = path.split("?")[0].split("#")[0];
    return clean.substring(clean.lastIndexOf("/") + 1);
  }

  function isServicesPage() {
    const currentFile = normalizePath(window.location.pathname);
    return currentFile === "services.html";
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

    // Services "active" underline:
    // If you're on services.html (any section), make Our Services button active (blue)
    if (servicesBtnE1) {
      if (isServicesPage()) {
        servicesBtnE1.classList.add("active");
      } else {
        servicesBtnE1.classList.remove("active");
      }
    }

    // Optional: if you want the mobile services button to indicate active state too
    // (not underline, but you could style it if desired)
    if (mobileServicesBtn) {
      if (isServicesPage()) {
        mobileServicesBtn.setAttribute("data-active", "true");
      } else {
        mobileServicesBtn.removeAttribute("data-active");
      }
    }
  }

  setActiveLink();

  /* -------- Mobile Services dropdown toggle (Fix #1) -------- */
  if (mobileServicesDD && mobileServicesBtn) {
    mobileServicesBtn.addEventListener("click", () => {
      const isOpen = mobileServicesDD.classList.toggle("open");
      mobileServicesBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close dropdown after tapping a service item
    if (mobileServicesMenu) {
      mobileServicesMenu.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          mobileServicesDD.classList.remove("open");
          mobileServicesBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* -------- Desktop: optional click toggle for touch laptops --------
     Hover already opens on desktop via CSS.
     This adds click-to-toggle for devices that don't hover well.
  */
  if (servicesDD && servicesBtnE1) {
    servicesBtnE1.addEventListener("click", (e) => {
      // Do not navigate; it's a button, but keep behavior consistent
      e.preventDefault();
      const isOpen = servicesDD.classList.toggle("open");
      servicesBtnE1.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close desktop dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!servicesDD.contains(e.target)) {
        servicesDD.classList.remove("open");
        servicesBtnE1.setAttribute("aria-expanded", "false");
      }
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        servicesDD.classList.remove("open");
        servicesBtnE1.setAttribute("aria-expanded", "false");
      }
    });
  }
});



/* Close button inside mobile menu */
closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
});


/* CODE FOR HERO SECTION */
/* Hero animation sequencing */
window.addEventListener("load", () => {
    const heroText = document.querySelector(".hero-text");
    const heroLinks = document.querySelector(".hero-links");

    setTimeout(() => {
        heroText.classList.add("animate");
    }, 300);

    setTimeout(() => {
        heroLinks.classList.add("animate");
    }, 1200);

    if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
        navElements.classList.add("scrolled-color","nav-link-scrolled");
        logo.classList.add("show-logo");

        navContainer.classList.remove("nav-container-center");
        navContainer.classList.add("nav-container-scrolled");

        servicesPanel.classList.add("services-panel--scrolled");
        servicesPanel.classList.remove("services-panel--centered");
    } else {
        navbar.classList.remove("scrolled");
        navElements.classList.remove("scrolled-color", "nav-link-scrolled");
        logo.classList.remove("show-logo");

        navContainer.classList.remove("nav-container-scrolled")
        navContainer.classList.add("nav-container-center");

        servicesPanel.classList.remove("services-panel--scrolled");
        servicesPanel.classList.add("services-panel--centered");
    }
    updateServicesPointer()
});


/* Scroll to services section on link click */
document.addEventListener("DOMContentLoaded", function () {
    const scrollBtn = document.getElementById("scrollToServices");
    const target = document.getElementById("Services-scroll");

    if (!scrollBtn || !target) return;

    scrollBtn.addEventListener("click", function () {
        const headerOffset = 10; 
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});




/* CONTACT FORM (EmailJS v4 + reCAPTCHA) */
document.addEventListener("DOMContentLoaded", () => {
  // Only run on pages that actually have the contact form
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const popup = document.getElementById("contact-popup");
  const popupMessage = document.getElementById("popup-message");
  const popupClose = document.getElementById("popup-close");
  const sendButton = form.querySelector("button[type='submit']");

  // If popup elements are missing, do not crash the entire page.
  // We'll fall back to alert() for messaging.
  const canUsePopup = !!(popup && popupMessage && popupClose);

  // EmailJS config
  const SERVICE_ID = "service_w9emfgl";
  const TEMPLATE_ID = "template_7n7qy9b";
  const PUBLIC_KEY = "JPNXLynMQIIkH4IYx";

  // Anti-spam / resource protection:
  // - Minimum time between sends (per browser session)
  // - AND max sends per time window (per browser session)
  const MIN_INTERVAL = 30000; // 30 seconds between sends
  const WINDOW_MS = 5 * 60 * 1000; // 5 minutes window
  const MAX_SENDS_PER_WINDOW = 3; // allow up to 3 messages per 5 minutes

  let lastSentTime = 0;
  let sendTimestamps = []; // stores Date.now() for recent sends within WINDOW_MS

  if (!sendButton) {
    console.error("Submit button not found inside .contact-form");
    return;
  }

  // Track if popup is currently open (used to control button re-enable behavior)
  let popupOpen = false;

  const disableSendButton = () => {
    sendButton.disabled = true;
  };

  const enableSendButton = () => {
    sendButton.disabled = false;
  };

  const showMessage = (html) => {
    if (canUsePopup) {
      popupMessage.innerHTML = html;
      popup.classList.remove("hidden");
      popupOpen = true;

      // Requirement: keep send button disabled until popup is closed
      disableSendButton();
    } else {
      // Fallback (prevents "classList of null" crashes)
      alert(html.replace(/<[^>]*>/g, ""));
    }
  };

  const hidePopup = () => {
    if (!canUsePopup) return;

    popup.classList.add("hidden");
    popupOpen = false;

    // Requirement: only re-enable after popup is closed
    enableSendButton();
  };

  // Fix #1: close button sometimes needs multiple clicks because it is inside a <form>
  // and defaults to type="submit". Prevent that by intercepting click and stopping submission.
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

  // Ensure EmailJS SDK is loaded
  if (typeof emailjs === "undefined") {
    console.error("EmailJS SDK not loaded. Check script tag for @emailjs/browser@4.");
    showMessage("Email service is not available right now. Please try again later.");
    return;
  }

  // Init EmailJS (v4 style)
  try {
    emailjs.init({ publicKey: PUBLIC_KEY });
  } catch (err) {
    console.error("EmailJS init failed:", err);
    showMessage("Email service failed to initialize. Please try again later.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // If popup is open, do not allow another send attempt
    if (popupOpen) return;

    const now = Date.now();

    // Clean timestamps outside the window
    sendTimestamps = sendTimestamps.filter((t) => now - t < WINDOW_MS);

    // Fix #3: hard cap messages per window (per browser session)
    if (sendTimestamps.length >= MAX_SENDS_PER_WINDOW) {
      const waitMs = WINDOW_MS - (now - sendTimestamps[0]);
      const waitSec = Math.ceil(waitMs / 1000);
      showMessage(
        `You have reached the message limit. Please try again in about <strong>${waitSec}</strong> seconds.`
      );
      return;
    }

    // Fix #3 (continued): minimum interval between sends
    if (now - lastSentTime < MIN_INTERVAL) {
      const waitSec = Math.ceil((MIN_INTERVAL - (now - lastSentTime)) / 1000);
      showMessage(`Please wait <strong>${waitSec}</strong> seconds before sending another message.`);
      return;
    }

    // Validate required fields
    const nameEl = form.querySelector("#name");
    const emailEl = form.querySelector("#email");
    const phoneEl = form.querySelector("#phone");
    const messageEl = form.querySelector("#message");

    if (!nameEl || !emailEl || !messageEl) {
      console.error("Missing required form fields (#name, #email, #message).");
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

    // reCAPTCHA must be correctly configured (domain allowlist)
    if (typeof grecaptcha === "undefined") {
      console.error("reCAPTCHA not loaded (grecaptcha undefined).");
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

    // Fix #2: disable immediately on click and keep disabled until popup close
    disableSendButton();

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then((res) => {
        console.log("EmailJS SUCCESS:", res);

        // Record successful send for rate-limiting
        lastSentTime = Date.now();
        sendTimestamps.push(lastSentTime);

        showMessage(
          `Hi <strong>${templateParams.name}</strong>, your message has been received! We will get back to you shortly.`
        );

        form.reset();
        try {
          grecaptcha.reset();
        } catch (err) {
          console.warn("Could not reset reCAPTCHA:", err);
        }

        // Do NOT re-enable here; requirement is re-enable only when popup closes
      })
      .catch((err) => {
        console.error("EmailJS FAILED:", err);

        // Note: do not count failed sends toward the window limit
        showMessage("Oops! Something went wrong. Please try again later.");

        // Do NOT re-enable here; requirement is re-enable only when popup closes
      });
  });
});
