(function () {
  "use strict";
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  var mobile = document.getElementById("nav-mobile");
  var overlay = document.getElementById("nav-overlay");

  function setNavOpen(open) {
    if (!header || !toggle || !mobile) return;
    header.classList.toggle("open", !!open);
    toggle.classList.toggle("site-nav__toggle--open", !!open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    if (overlay) {
      if (open) overlay.removeAttribute("hidden");
      else overlay.setAttribute("hidden", "");
      overlay.setAttribute("aria-hidden", open ? "false" : "true");
    }
    document.body.classList.toggle("nav-open", !!open);
  }

  function closeNav() {
    setNavOpen(false);
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("site-header--scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && mobile) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setNavOpen(!header.classList.contains("open"));
    });
    mobile.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeNav);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });
})();
