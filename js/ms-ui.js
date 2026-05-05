(function (w) {
  "use strict";
  var M = w.MS;
  var modalWired = false;

  M.initScrollReveal = function (root) {
    root = root || document;
    var els = root.querySelectorAll(".scroll-reveal, .scroll-slide-left, .scroll-slide-right");
    if (!els.length) return;
    if (!("IntersectionObserver" in w)) {
      els.forEach(function (el) {
        el.classList.add("revealed");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.06 }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  };

  M.wireModalOnce = function () {
    if (modalWired) return;
    modalWired = true;
    var modal = document.getElementById("site-modal");
    if (!modal) return;
    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-modal-close]") || e.target.closest("[data-modal-backdrop]")) {
        M.closeModal();
      }
    });
  };

  M.closeModal = function () {
    var m = document.getElementById("site-modal");
    if (m) m.hidden = true;
  };

  M.openModal = function (title, html) {
    var m = document.getElementById("site-modal");
    if (!m) return;
    var t = m.querySelector("[data-modal-title]");
    var b = m.querySelector("[data-modal-body]");
    if (t) t.textContent = title;
    if (b) b.innerHTML = html;
    m.hidden = false;
  };

  M.wireAboutFaq = function (root) {
    root.addEventListener("click", function (e) {
      var btn = e.target.closest(".faq-item__btn");
      if (!btn) return;
      var i = btn.getAttribute("data-faq");
      var panel = root.querySelector('[data-faq-panel="' + i + '"]');
      var chev = btn.querySelector(".faq-item__chevron");
      var isOpen = panel && panel.classList.contains("faq-item__panel--open");
      root.querySelectorAll(".faq-item__panel").forEach(function (p) {
        p.classList.remove("faq-item__panel--open");
      });
      root.querySelectorAll(".faq-item__chevron").forEach(function (c) {
        c.classList.remove("faq-item__chevron--open");
      });
      if (!isOpen && panel) {
        panel.classList.add("faq-item__panel--open");
        if (chev) chev.classList.add("faq-item__chevron--open");
      }
    });
  };
})(window);
