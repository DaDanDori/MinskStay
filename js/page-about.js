(function (w) {
  "use strict";
  var M = w.MS;

  // Пример команды с реальными фотографиями
  M.TEAM = [
    { name: "Александр Петров", role: "Генеральный директор", initials: "АП", img: "images/alexander.jpg" },
    { name: "Яна Васильева", role: "Заместитель директора", initials: "ЯВ", img: "images/yana.jpg" },
    { name: "Алексей Рак", role: "Управляющий отделом продаж", initials: "АР", img: "images/aleksey.jpg" },
    { name: "Мария Иванова", role: "Менеджер по работе с клиентами", initials: "МИ", img: "images/maria.jpg" },
    { name: "Дмитрий Козлов", role: "Специалист по отелям", initials: "ДК", img: "images/dmitry.jpg" },
    { name: "Елена Смирнова", role: "Маркетолог", initials: "ЕС", img: "images/elena.jpg" },
    { name: "Максим Лавров", role: "Консультант", initials: "МЛ", img: "images/maksim.jpg" },
    { name: "Дарья Машиновская", role: "Консультант", initials: "ДМ", img: "images/darya.jpg" }
  ];

  M.renderAbout = function () {
    var faq = M.FAQ_ITEMS.map(function (item, i) {
      return (
        '<div class="faq-item scroll-reveal" style="transition-delay:' +
        i * 60 +
        'ms"><button type="button" class="faq-item__btn" data-faq="' +
        i +
        '"><span>' +
        M.escapeHtml(item.q) +
        '</span><svg class="faq-item__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>' +
        '<div class="faq-item__panel" data-faq-panel="' +
        i +
        '"><p class="faq-item__answer">' +
        M.escapeHtml(item.a) +
        "</p></div></div>"
      );
    }).join("");

    return (
      '<div class="page">' +
      '<section class="catalog-hero bg-hero-gradient"><div class="container" style="text-align:center"><h1 class="font-display" style="font-size:clamp(2rem,4vw,3rem);color:var(--secondary-foreground);margin:0 0 1rem">О компании</h1>' +
      '<p style="color:hsl(0 0% 100% / 0.75);max-width:36rem;margin:0 auto;font-size:1.125rem">MinskStay — ваш надёжный партнёр в подборе отелей и гостиниц Минска</p></div></section>' +
      '<section class="section"><div class="container"><div style="display:grid;gap:4rem;grid-template-columns:1fr;align-items:center" class="about-grid">' +
      '<div class="scroll-slide-left"><span class="section-head__badge">Наша история</span><h2 class="font-display" style="font-size:clamp(1.75rem,3vw,2.25rem);margin:1rem 0">Мы помогаем путешественникам с 2014 года</h2>' +
      '<p class="text-muted" style="line-height:1.7;margin-bottom:1rem">Компания MinskStay была основана группой энтузиастов, которые хотели сделать подбор отелей в Минске максимально простым и удобным.</p>' +
      '<p class="text-muted" style="line-height:1.7;margin:0">За годы работы мы помогли тысячам гостей столицы найти идеальное место для проживания — от уютных бутик-отелей до роскошных пятизвёздочных гостиниц.</p></div>' +
      '<div class="scroll-slide-right"><div class="map-embed"><img src="images/team.jpg" alt="Наша команда" style="width:100%;height:20rem;object-fit:cover" onerror="this.onerror=null;this.src=\'' + M.PLACEHOLDER + '\'"/></div></div></div></div></section>' +
      '<section class="section section--dark"><div class="container"><div style="display:grid;gap:3rem;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">' +
      '<div class="scroll-reveal" style="padding:2rem;border-radius:1rem;border:1px solid hsl(0 0% 100% / 0.1)"><h3 class="font-display" style="font-size:1.5rem;margin:0 0 1rem">Наша миссия</h3><p style="opacity:0.85;line-height:1.6;margin:0">Сделать поиск и бронирование отелей в Минске максимально простым, прозрачным и доступным для каждого гостя столицы.</p></div>' +
      '<div class="scroll-reveal" style="padding:2rem;border-radius:1rem;border:1px solid hsl(0 0% 100% / 0.1)"><h3 class="font-display" style="font-size:1.5rem;margin:0 0 1rem">Наше видение</h3><p style="opacity:0.85;line-height:1.6;margin:0">Стать ведущим сервисом подбора отелей в Беларуси, задавая стандарты качества и клиентского сервиса в отрасли.</p></div></div></div></section>' +
      '<section class="section section--stats-gradient"><div class="container"><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2rem;text-align:center" class="md:grid-cols-4">' +
      [
        { n: "10+", l: "лет опыта" },
        { n: "50+", l: "партнёров" },
        { n: "5000+", l: "клиентов" },
        { n: "4.9", l: "средний рейтинг" },
      ]
        .map(function (s) {
          return (
            '<div class="scroll-reveal"><p class="font-display" style="font-size:clamp(2rem,4vw,3rem);color:var(--primary);margin:0 0 0.5rem">' +
            s.n +
            '</p><p class="text-muted" style="font-size:0.875rem;font-weight:500;margin:0">' +
            M.escapeHtml(s.l) +
            "</p></div>"
          );
        })
        .join("") +
      "</div></div></section>" +
      '<section class="section"><div class="container"><div class="section-head scroll-reveal"><span class="section-head__badge">Люди</span><h2 class="section-head__title">Наша команда</h2></div>' +
      '<div style="display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">' +
      M.TEAM.map(function (m, i) {
        return (
          '<div class="scroll-reveal text-center" style="transition-delay:' +
          i * 80 +
          'ms">' +
          '<div style="width:6rem;height:6rem;margin:0 auto 1rem;border-radius:999px;overflow:hidden">' +
          '<img src="' + M.escapeHtml(m.img || M.PLACEHOLDER) + '" alt="' + M.escapeHtml(m.name) + '" style="width:100%;height:100%;object-fit:cover" onerror="this.onerror=null;this.src=\'' + M.PLACEHOLDER + '\'"/>' +
          '</div>' +
          '<h4 class="font-display" style="margin:0">' + M.escapeHtml(m.name) + '</h4>' +
          '<p class="text-muted" style="font-size:0.75rem;margin:0.25rem 0 0">' + M.escapeHtml(m.role) + '</p>' +
          "</div>"
        );
      }).join("") +
      "</div></div></section>" +
      '<section class="section section--muted-gradient"><div class="container max-w-3xl" style="max-width:48rem;margin:0 auto"><div class="section-head scroll-reveal"><span class="section-head__badge">FAQ</span><h2 class="section-head__title">Часто задаваемые вопросы</h2></div>' +
      faq +
      "</div></section></div>"
    );
  };

  M.wireAboutFaq = function (root) {
    root.querySelectorAll("[data-faq]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = btn.getAttribute("data-faq");
        var item = btn.closest(".faq-item");
        var panel = root.querySelector('[data-faq-panel="' + i + '"]');
        var chev = btn.querySelector(".faq-item__chevron");
        var wasOpen = item.classList.contains("faq-item--open");
        root.querySelectorAll(".faq-item").forEach(function (it) {
          it.classList.remove("faq-item--open");
        });
        root.querySelectorAll(".faq-item__panel").forEach(function (p) {
          p.classList.remove("faq-item__panel--open");
        });
        root.querySelectorAll(".faq-item__chevron").forEach(function (c) {
          c.classList.remove("faq-item__chevron--open");
        });
        if (!wasOpen) {
          item.classList.add("faq-item--open");
          panel.classList.add("faq-item__panel--open");
          chev.classList.add("faq-item__chevron--open");
        }
      });
    });
  };
})(window);