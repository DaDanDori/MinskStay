
(function (w) {
  "use strict";
  var M = w.MS;

  M.renderHome = function (hotels) {
    var top = hotels.slice(0, 3);
    var cards = top
      .map(function (h, i) {
        return (
          '<div class="scroll-reveal" style="transition-delay:' +
          i * 100 +
          'ms"><article class="hotel-card"><div class="hotel-card__media">' +
          M.imgTag(h.images[0] || M.PLACEHOLDER, h.nameRu, "") +
          '<span class="hotel-card__price">от ' +
          M.escapeHtml(String(h.price)) +
          " " +
          M.escapeHtml(h.currency) +
          '</span></div><div class="hotel-card__body"><div class="hotel-card__stars">' +
          M.starsRow(h.stars) +
          '</div><h3 class="hotel-card__name">' +
          M.escapeHtml(h.nameRu) +
          '</h3><p class="hotel-card__addr">' +
          M.escapeHtml(h.address) +
          '</p><a class="btn btn--primary btn--sm" href="hotel.html?id=' +
          M.escapeHtml(h.id) +
          '">Подробнее <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a></div></article></div>'
        );
      })
      .join("");

    var reviews = M.REVIEWS.map(function (r, i) {
      return (
        '<div class="scroll-reveal review-card" style="transition-delay:' +
        i * 80 +
        'ms"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem"><span class="stars-row">' +
        new Array(r.rating).fill(M.starSvg(14)).join("") +
        '</span><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="opacity:.2;color:var(--primary)"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg></div><p class="text-muted" style="font-style:italic;margin-bottom:1.5rem;line-height:1.6">«' +
        M.escapeHtml(r.text) +
        '»</p><div style="display:flex;align-items:center;gap:0.75rem"><div style="width:2.75rem;height:2.75rem;border-radius:999px;background:var(--gold-gradient);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.875rem;color:var(--primary-foreground)">' +
        M.escapeHtml(
          r.name
            .split(" ")
            .map(function (word) { return word[0]; })
            .join("")
        ) +
        '</div><div><p style="margin:0;font-weight:600">' +
        M.escapeHtml(r.name) +
        '</p><p style="margin:0;font-size:0.75rem;color:var(--muted-foreground)">' +
        M.escapeHtml(r.hotel) +
        "</p></div></div></div>"
      );
    }).join("");

    return (
      '<div class="page page--home">' +
      '<section class="hero" id="hero-section">' +
      '<div class="hero__slides">' +
      M.HERO_IMAGES.map(function (src, i) {
        return (
          '<img src="' +
          M.escapeHtml(src) +
          '" alt="" class="hero__slide' +
          (i === 0 ? " hero__slide--active" : "") +
          '" data-hero-slide="' +
          i +
          '" onerror="this.onerror=null;this.src=\'' +
          M.PLACEHOLDER +
          "'\"/>"
        );
      }).join("") +
      '</div><div class="hero__overlay"></div>' +
      '<div class="hero__content"><h1 class="hero__title">Лучшие отели Минска</h1>' +
      '<p class="hero__subtitle">Подберём идеальный отель для вашего отдыха или деловой поездки в столице Беларуси</p>' +
      '<div class="hero__actions"><a class="btn btn--primary" href="catalog.html">Смотреть каталог</a>' +
      '<a class="btn btn--outline-light" href="contact.html">Связаться с нами</a></div></div>' +
      '<div class="hero__dots">' +
      M.HERO_IMAGES.map(function (_, i) {
        return (
          '<button type="button" class="hero__dot' +
          (i === 0 ? " hero__dot--active" : "") +
          '" data-hero-dot="' +
          i +
          '" aria-label="Слайд ' +
          (i + 1) +
          '"></button>'
        );
      }).join("") +
      "</div></section>" +
      '<section class="section section--dark"><div class="container"><h2 class="section-head__title scroll-reveal" style="text-align:center;margin-bottom:4rem">Почему выбирают нас</h2>' +
      '<div style="display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">' +
      [
        { t: "Проверенные отели", d: "Все отели проходят тщательную проверку качества нашими экспертами" },
        { t: "Лучшие цены", d: "Гарантируем самые выгодные предложения на рынке Минска" },
        { t: "Поддержка 24/7", d: "Наша команда всегда готова помочь вам в любое время" },
      ]
        .map(function (x, i) {
          return (
            '<div class="scroll-reveal why-card" style="transition-delay:' +
            i * 100 +
            'ms;text-align:center;padding:2rem;border-radius:1rem;border:1px solid hsl(0 0% 100% / 0.1);background:hsl(0 0% 100% / 0.05)"><h3 class="font-display" style="font-size:1.5rem;margin:0 0 0.75rem">' +
            M.escapeHtml(x.t) +
            '</h3><p style="opacity:0.7;font-size:0.875rem;line-height:1.6;margin:0">' +
            M.escapeHtml(x.d) +
            "</p></div>"
          );
        })
        .join("") +
      "</div></div></section>" +
      '<section class="section"><div class="container"><div class="section-head scroll-reveal"><span class="section-head__badge">Популярные</span>' +
      '<h2 class="section-head__title">Популярные отели</h2><p class="section-head__desc">Наши самые востребованные варианты размещения в Минске</p></div>' +
      '<div style="display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">' +
      cards +
      '</div><div class="text-center mt-8 scroll-reveal"><a class="btn btn--outline-primary" href="catalog.html">Все отели <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a></div></div></section>' +
      '<section class="section section--muted-gradient"><div class="container"><div class="section-head scroll-reveal"><span class="section-head__badge">Отзывы</span>' +
      '<h2 class="section-head__title">Отзывы клиентов</h2><p class="section-head__desc">Что говорят наши гости о сотрудничестве с MinskStay</p></div>' +
      '<div style="display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">' +
      reviews +
      "</div></div></section>" +
      '<section class="section section--dark"><div class="container"><div class="section-head scroll-reveal"><h2 class="section-head__title">Отели на карте</h2>' +
      '<p class="section-head__desc" style="opacity:0.7">Найдите ближайший отель в Минске</p></div>' +
      '<div class="scroll-reveal map-embed map-embed--leaflet" data-leaflet-map data-map-role="hotels" data-lat="53.9045" data-lng="27.5615" data-zoom="12">' +
      '<div class="map-embed__toolbar" role="toolbar" aria-label="Управление картой">' +
      '<button type="button" class="map-embed__fs" aria-label="Полноэкранный режим карты">На весь экран</button></div>' +
      '<div class="map-embed__canvas" role="region" aria-label="Карта Минска"></div>' +
      '<div class="map-fallback" hidden><p>Карта не загрузилась (сеть или скрипты недоступны).</p><p>' +
      '<a href="https://www.openstreetmap.org/#map=12/53.9045/27.5615" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> · ' +
      '<a href="https://yandex.by/maps/?pt=27.5615,53.9045&amp;z=12" target="_blank" rel="noopener noreferrer">Яндекс</a></p></div></div></div></section></div>'
    );
  };

  M.initHeroRotator = function (root) {
    var section = root.querySelector("#hero-section");
    if (!section) return;
    var slides = section.querySelectorAll("[data-hero-slide]");
    var dots = section.querySelectorAll("[data-hero-dot]");
    var n = slides.length;
    var idx = 0;

    function set(i) {
      idx = (i + n) % n;
      slides.forEach(function (s, j) {
        s.classList.toggle("hero__slide--active", j === idx);
      });
      dots.forEach(function (d, j) {
        d.classList.toggle("hero__dot--active", j === idx);
      });
    }

    section.addEventListener("click", function (e) {
      var dot = e.target.closest("[data-hero-dot]");
      if (dot) set(parseInt(dot.getAttribute("data-hero-dot"), 10));
    });

    section._heroTimer = setInterval(function () {
      set(idx + 1);
    }, 5000);
  };
})(window);
