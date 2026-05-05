/**
 * Контакты: форма обратной связи (FormSubmit → email при работе по HTTP/HTTPS; иначе mailto).
 */
(function (w) {
  "use strict";
  var M = w.MS;

  M.renderContact = function () {
    var action = "https://formsubmit.co/" + encodeURIComponent(M.CONTACT_FORM_EMAIL);
    return (
      '<div class="page page--contact">' +
      '<section class="catalog-hero contact-hero bg-hero-gradient"><div class="container contact-hero__inner">' +
      '<h1 class="font-display contact-hero__title">Контакты</h1>' +
      '<p class="contact-hero__lead">Напишите нам — ответим на указанный вами email.</p></div></section>' +
      '<section class="section"><div class="container">' +
      '<div class="contact-layout">' +
      '<div class="contact-card contact-card--info scroll-slide-left">' +
      '<h2 class="contact-card__title font-display">Наши данные</h2>' +
      '<ul class="contact-info-list">' +
      '<li class="contact-info-list__item"><span class="contact-info-list__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>' +
      '<div><span class="contact-info-list__label">Адрес офиса</span><span class="contact-info-list__value">г. Минск, пр. Независимости, 11</span></div></li>' +
      '<li class="contact-info-list__item"><span class="contact-info-list__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>' +
      '<div><span class="contact-info-list__label">Телефон</span><a class="contact-info-list__value contact-info-list__value--link" href="tel:+375291234567">+375 (29) 123-45-67</a></div></li>' +
      '<li class="contact-info-list__item"><span class="contact-info-list__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>' +
      '<div><span class="contact-info-list__label">Email</span><a class="contact-info-list__value contact-info-list__value--link" href="mailto:' +
      M.escapeHtml(M.PUBLIC_CONTACT_EMAIL) +
      '">' +
      M.escapeHtml(M.PUBLIC_CONTACT_EMAIL) +
      '</a></div></li>' +
      '</ul>' +
      '<div class="contact-hours"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
      '<div><strong>Часы работы</strong><p>Пн–Пт: 9:00 – 20:00<br/>Сб–Вс: 10:00 – 18:00</p></div></div></div>' +
      '<div class="contact-card contact-card--form scroll-slide-right">' +
      '<h2 class="contact-card__title font-display">Напишите нам</h2>' +
      '<p class="contact-form-intro">Поля со звёздочкой обязательны. Ответ придёт на указанный вами email; заявка обрабатывается через FormSubmit.</p>' +
      '<form id="contact-form" class="contact-form" method="POST" action="' +
      M.escapeHtml(action) +
      '" novalidate>' +
      '<input type="hidden" name="_captcha" value="false"/>' +
      '<input type="hidden" name="_template" value="table"/>' +
      '<input type="hidden" name="_subject" id="contact-form-subject" value="MinskStay: сообщение с сайта"/>' +
      '<input type="hidden" name="_next" id="contact-form-next" value=""/>' +
      '<div class="form-field"><label class="form-label" for="cf-name">Имя *</label><input type="text" class="form-input" id="cf-name" name="name" placeholder="Как к вам обращаться" autocomplete="name" required maxlength="120"/></div>' +
      '<div class="form-field"><label class="form-label" for="cf-email">Email *</label><input type="email" class="form-input" id="cf-email" name="email" placeholder="name@example.com" autocomplete="email" required maxlength="200"/></div>' +
      '<div class="form-field"><label class="form-label" for="cf-phone">Телефон</label><input type="tel" class="form-input" id="cf-phone" name="phone" placeholder="+375 (__) ___-__-__" autocomplete="tel" maxlength="40"/></div>' +
      '<div class="form-field"><label class="form-label" for="cf-topic">Тема *</label>' +
      '<select class="form-input form-select" id="cf-topic" name="topic" required>' +
      '<option value="">Выберите тему</option>' +
      '<option value="booking">Бронирование отеля</option>' +
      '<option value="question">Вопрос по каталогу</option>' +
      '<option value="corporate">Корпоративным клиентам</option>' +
      '<option value="other">Другое</option></select></div>' +
      '<div class="form-field"><label class="form-label" for="cf-dates">Планируемые даты поездки</label><input type="text" class="form-input" id="cf-dates" name="trip_dates" placeholder="Например: 10–15 июня 2025" maxlength="200"/></div>' +
      '<div class="form-field"><label class="form-label" for="cf-msg">Сообщение *</label><textarea class="form-input" id="cf-msg" name="message" rows="5" placeholder="Опишите запрос" required maxlength="4000"></textarea></div>' +
      '<button type="submit" class="btn btn--gold btn--block contact-form__submit" id="contact-submit">Отправить на почту</button>' +
      "</form></div></div></div></section>" +
      '<section class="section section--map"><div class="container"><h2 class="font-display section-map__title scroll-reveal">Мы на карте</h2>' +
      '<div class="scroll-reveal map-embed map-embed--leaflet map-embed--rounded map-embed--h-sm" data-leaflet-map data-map-role="office" data-lat="53.8986" data-lng="27.5548" data-zoom="16" data-marker-title="Офис MinskStay, пр. Независимости, 11">' +
      '<div class="map-embed__toolbar" role="toolbar" aria-label="Управление картой">' +
      '<button type="button" class="map-embed__fs" aria-label="Полноэкранный режим карты">На весь экран</button></div>' +
      '<div class="map-embed__canvas" role="region" aria-label="Офис на карте"></div>' +
      '<div class="map-fallback" hidden><p>Карта не загрузилась (сеть или скрипты недоступны).</p><p>' +
      '<a href="https://www.openstreetmap.org/#map=16/53.8986/27.5548" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> · ' +
      '<a href="https://yandex.by/maps/?pt=27.5548,53.8986&amp;z=16" target="_blank" rel="noopener noreferrer">Яндекс</a></p></div></div></div></section></div>'
    );
  };

  M.wireContactForm = function (root) {
    var form = root.querySelector("#contact-form");
    if (!form) return;

    var nextInput = form.querySelector("#contact-form-next");
    var subjInput = form.querySelector("#contact-form-subject");
    try {
      if (nextInput && (w.location.protocol === "http:" || w.location.protocol === "https:")) {
        var u = new URL("contact.html", w.location.href);
        u.searchParams.set("sent", "1");
        nextInput.value = u.href;
      }
    } catch (err) {
      /* ignore */
    }

    var topicLabels = {
      booking: "Бронирование отеля",
      question: "Вопрос по каталогу",
      corporate: "Корпоративным клиентам",
      other: "Другое",
    };

    function showErr(id, msg) {
      var el = form.querySelector("#" + id);
      if (!el) return;
      el.classList.add("form-input--error");
      var hid = id.replace("cf-", "");
      var p = form.querySelector("#err-" + hid);
      if (!p) {
        p = document.createElement("p");
        p.id = "err-" + hid;
        p.className = "form-error";
        el.closest(".form-field").appendChild(p);
      }
      p.textContent = msg || "";
    }

    function clearErr(id) {
      var el = form.querySelector("#" + id);
      if (el) el.classList.remove("form-input--error");
      var hid = id.replace("cf-", "");
      var p = form.querySelector("#err-" + hid);
      if (p) p.textContent = "";
    }

    form.addEventListener("submit", function (e) {
      var name = form.querySelector("#cf-name").value.trim();
      var email = form.querySelector("#cf-email").value.trim();
      var topic = form.querySelector("#cf-topic").value;
      var msg = form.querySelector("#cf-msg").value.trim();
      clearErr("cf-name");
      clearErr("cf-email");
      clearErr("cf-topic");
      clearErr("cf-msg");
      var ok = true;
      if (!name) {
        showErr("cf-name", "Введите имя");
        ok = false;
      }
      if (!email) {
        showErr("cf-email", "Введите email");
        ok = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showErr("cf-email", "Некорректный email");
        ok = false;
      }
      if (!topic) {
        showErr("cf-topic", "Выберите тему");
        ok = false;
      }
      if (!msg) {
        showErr("cf-msg", "Введите сообщение");
        ok = false;
      }
      if (!ok) {
        e.preventDefault();
        return;
      }

      var label = topicLabels[topic] || topic;
      if (subjInput) subjInput.value = "MinskStay: " + label + " — " + name;

      if (w.location.protocol === "file:") {
        e.preventDefault();
        var phone = form.querySelector("#cf-phone").value.trim();
        var dates = form.querySelector("#cf-dates").value.trim();
        var body =
          "Имя: " +
          name +
          "\nEmail: " +
          email +
          "\nТелефон: " +
          (phone || "—") +
          "\nТема: " +
          label +
          "\nДаты: " +
          (dates || "—") +
          "\n\n" +
          msg;
        w.location.href =
          "mailto:" +
          encodeURIComponent(M.CONTACT_FORM_EMAIL) +
          "?subject=" +
          encodeURIComponent("MinskStay: " + label) +
          "&body=" +
          encodeURIComponent(body);
        M.openModal(
          "Откройте почту",
          '<p class="text-muted" style="margin-bottom:1rem">Если почтовый клиент не открылся, отправьте письмо на <strong>' +
            M.escapeHtml(M.CONTACT_FORM_EMAIL) +
            "</strong> вручную.</p>" +
            '<button type="button" class="btn btn--primary" id="contact-mailto-close">Закрыть</button>'
        );
        var c = document.getElementById("contact-mailto-close");
        if (c) c.addEventListener("click", M.closeModal);
        return;
      }
      /* http(s): нативная отправка POST на FormSubmit */
    });
  };
})(window);
