(() => {
  "use strict";

  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Header glass on scroll (very lightweight)
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 10) header.classList.add("is-glass");
    else header.classList.remove("is-glass");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close on link click
    navMenu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 780px)").matches) {
        const clickedInside = navMenu.contains(e.target) || navToggle.contains(e.target);
        if (!clickedInside) {
          navMenu.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // Warranty form behavior
  const form = document.getElementById("warrantyForm");
  const input = document.getElementById("warrantyInput");
  const errorBox = document.getElementById("warrantyError");

  if (form && input && errorBox) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const value = String(input.value || "").trim();
      const isValid = value.length >= 6 && value.length <= 32;

      errorBox.hidden = false;

 
      if (!isValid) {
        // Keep same message; just ensure focus
        input.focus();
        return;
      }

      // Slight delay for natural UX (no heavy work)
      form.classList.add("is-busy");
      window.setTimeout(() => {
        form.classList.remove("is-busy");
        errorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 150);
    });
  }
})();