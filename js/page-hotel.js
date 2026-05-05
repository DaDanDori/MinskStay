/**
 * Страница отеля: галерея, бронирование в модальном окне.
 */
(function (w) {
  "use strict";
  var M = w.MS;

  M.renderHotelDetail = function (hotel) {
    var imgs = hotel.images.length ? hotel.images : [M.PLACEHOLDER];
    return (
      '<div class="page animate-fade-in">' +
      '<section class="hotel-gallery" id="hotel-gallery">' +
      imgs
        .map(function (src, i) {
          return (
            '<img src="' +
            M.escapeHtml(src) +
            '" alt="' +
            M.escapeHtml(hotel.nameRu + " — фото " + (i + 1)) +
            '" class="hotel-gallery__img' +
            (i === 0 ? " hotel-gallery__img--active" : "") +
            '" data-gallery-img="' +
            i +
            '" onerror="this.onerror=null;this.src=\'' +
            M.PLACEHOLDER +
            "'\"/>"
          );
        })
        .join("") +
      '<div class="hotel-gallery__grad"></div>' +
      '<button type="button" class="hotel-gallery__nav hotel-gallery__nav--prev" aria-label="Предыдущее фото"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button>' +
      '<button type="button" class="hotel-gallery__nav hotel-gallery__nav--next" aria-label="Следующее фото"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>' +
      '<div class="hotel-gallery__dots">' +
      imgs
        .map(function (_, i) {
          return (
            '<button type="button" class="hotel-gallery__dot' +
            (i === 0 ? " hotel-gallery__dot--active" : "") +
            '" data-gallery-dot="' +
            i +
            '" aria-label="Фото ' +
            (i + 1) +
            '"></button>'
          );
        })
        .join("") +
      "</div></section>" +
      '<section class="hotel-detail"><a class="hotel-detail__back" href="catalog.html"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Назад к каталогу</a>' +
      '<div class="hotel-detail__head"><div><div class="stars-row" style="margin-bottom:0.5rem">' +
      M.starsRow(hotel.stars) +
      '</div><h1 class="font-display" style="font-size:clamp(1.75rem,3vw,2.5rem);margin:0 0 0.5rem">' +
      M.escapeHtml(hotel.nameRu) +
      '</h1><p class="text-muted" style="display:flex;align-items:center;gap:0.375rem;margin:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
      M.escapeHtml(hotel.address) +
      "</p>" +
      (hotel.district
        ? '<p class="text-muted" style="font-size:0.875rem;margin:0.25rem 0 0">Район: ' + M.escapeHtml(hotel.district) + "</p>"
        : "") +
      '</div><div class="hotel-detail__price-block"><p class="text-muted" style="margin:0;font-size:0.875rem">от</p>' +
      '<p class="hotel-detail__price-val">' +
      M.escapeHtml(String(hotel.price)) +
      " " +
      M.escapeHtml(hotel.currency) +
      '</p><p class="text-muted" style="font-size:0.75rem;margin:0">за ночь</p></div></div>' +
      '<div class="hotel-detail__rating-bar"><span style="display:flex;align-items:center;gap:0.375rem;font-size:1.5rem;font-weight:700">' +
      M.starSvg(18) +
      " " +
      M.escapeHtml(String(hotel.rating)) +
      '</span><span class="text-muted" style="font-size:0.875rem">' +
      M.escapeHtml(String(hotel.reviews)) +
      " отзывов</span></div>" +
      '<div><h2 class="font-display" style="font-size:1.5rem;margin:0 0 0.75rem">Описание</h2><p class="hotel-detail__desc">' +
      M.escapeHtml(hotel.description) +
      '</p></div><div style="margin-bottom:2rem"><h2 class="font-display" style="font-size:1.5rem;margin:0 0 0.75rem">Удобства</h2><div class="hotel-detail__tags">' +
      hotel.amenities
        .map(function (a) {
          return '<span class="hotel-detail__tag">' + M.escapeHtml(a) + "</span>";
        })
        .join("") +
      '</div></div><button type="button" class="btn btn--gold" id="hotel-book-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Забронировать</button></section></div>'
    );
  };

  M.buildBookingFormHtml = function (hotel) {
    return (
      '<p class="text-muted" style="font-size:0.875rem;margin:0 0 1rem">Отель: <strong style="color:var(--foreground)">' +
      M.escapeHtml(hotel.nameRu) +
      '</strong></p><form id="booking-form" novalidate><div style="margin-bottom:1rem">' +
      '<input type="text" class="form-input" name="name" placeholder="Ваше имя *" autocomplete="name"/></div>' +
      '<div style="margin-bottom:1rem"><input type="tel" class="form-input" name="phone" placeholder="Телефон *" autocomplete="tel"/></div>' +
      '<button type="submit" class="btn btn--gold btn--block">Подтвердить бронирование</button></form>'
    );
  };

  M.wireBookingForm = function (hotel) {
    var body = document.querySelector("[data-modal-body]");
    if (!body) return;
    var form = body.querySelector("#booking-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var en = form.querySelector('[name="name"]');
      var ep = form.querySelector('[name="phone"]');
      en.classList.remove("form-input--error");
      ep.classList.remove("form-input--error");
      var err = false;
      if (!name) {
        en.classList.add("form-input--error");
        err = true;
      }
      if (!phone) {
        ep.classList.add("form-input--error");
        err = true;
      }
      if (err) return;
      M.closeModal();
      M.openModal(
        "Бронирование подтверждено!",
        '<div style="text-align:center"><div style="width:4rem;height:4rem;margin:0 auto 1rem;border-radius:999px;background:var(--accent);display:flex;align-items:center;justify-content:center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--primary)"><polyline points="20 6 9 17 4 12"/></svg></div>' +
          '<p class="text-muted" style="margin-bottom:1rem">Спасибо! Мы свяжемся с вами для подтверждения деталей бронирования.</p>' +
          '<button type="button" class="btn btn--primary" id="booking-success-close">Закрыть</button></div>'
      );
      var cls = document.getElementById("booking-success-close");
      if (cls) cls.addEventListener("click", M.closeModal);
    });
  };

  M.wireHotelGallery = function (root, hotel) {
    var section = root.querySelector("#hotel-gallery");
    if (!section) return;
    var imgs = section.querySelectorAll("[data-gallery-img]");
    var dots = section.querySelectorAll("[data-gallery-dot]");
    var n = imgs.length;
    var idx = 0;

    function set(i) {
      idx = (i + n) % n;
      imgs.forEach(function (img, j) {
        img.classList.toggle("hotel-gallery__img--active", j === idx);
      });
      dots.forEach(function (d, j) {
        d.classList.toggle("hotel-gallery__dot--active", j === idx);
      });
    }

    var timer = setInterval(function () {
      set(idx + 1);
    }, 5000);
    section._galTimer = timer;

    section.addEventListener("click", function (e) {
      var dot = e.target.closest("[data-gallery-dot]");
      if (dot) {
        set(parseInt(dot.getAttribute("data-gallery-dot"), 10));
        return;
      }
      if (e.target.closest(".hotel-gallery__nav--prev")) set(idx - 1);
      if (e.target.closest(".hotel-gallery__nav--next")) set(idx + 1);
    });

    var bookBtn = root.querySelector("#hotel-book-btn");
    if (bookBtn) {
      bookBtn.addEventListener("click", function () {
        M.openModal("Бронирование", M.buildBookingFormHtml(hotel));
        M.wireBookingForm(hotel);
      });
    }
  };
})(window);
