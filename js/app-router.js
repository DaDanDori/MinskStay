(function (w) {
  "use strict";
  var MS = w.MS;
  if (!MS) return;

  function hotelsWarnHtml() {
    if (!MS._hotelsLoadError) return "";
    return (
      '<div class="container" style="padding:0.5rem 1rem 0;max-width:72rem;margin-inline:auto">' +
      '<div class="catalog-load-warn" style="background:hsl(45 90% 94%);border:1px solid hsl(45 55% 70%);border-radius:var(--radius);padding:0.75rem 1rem;font-size:0.9rem;line-height:1.5">' +
      MS.escapeHtml(MS._hotelsLoadError) +
      "</div></div>"
    );
  }

  MS.runPage = async function () {
    if (typeof MS.wireModalOnce === "function") MS.wireModalOnce();
    var main = document.getElementById("main-content");
    if (!main) return;

    var page = document.body.getAttribute("data-page") || "home";
    var params = new URLSearchParams(w.location.search);

    if (page === "home") {
      await MS.loadHotels();
      main.innerHTML = hotelsWarnHtml() + MS.renderHome(MS.getHotels());
      MS.initScrollReveal(main);
      MS.initHeroRotator(main);
      if (typeof MS.mountLeafletMaps === "function") MS.mountLeafletMaps(main);
      return;
    }

    if (page === "catalog") {
      await MS.loadHotels();
      var hotels = MS.getHotels();
      main.innerHTML = hotelsWarnHtml() + MS.renderCatalog(hotels);
      MS.initScrollReveal(main);
      MS.wireCatalog(main, hotels);
      return;
    }

    if (page === "hotel") {
      await MS.loadHotels();
      var id = params.get("id") || "1";
      var hotel = w.MinskStayHotels.findHotelById(MS.getHotels(), id);
      if (!hotel) {
        main.innerHTML =
          '<div class="empty-state"><h2 class="font-display">Отель не найден</h2><p class="text-muted"><a href="catalog.html">Вернуться к каталогу</a></p></div>';
        MS.initScrollReveal(main);
        return;
      }
      main.innerHTML = hotelsWarnHtml() + MS.renderHotelDetail(hotel);
      document.title = hotel.nameRu + " — MinskStay";
      MS.initScrollReveal(main);
      MS.wireHotelGallery(main, hotel);
      return;
    }

    if (page === "about") {
      main.innerHTML = MS.renderAbout();
      MS.initScrollReveal(main);
      MS.wireAboutFaq(main);
      return;
    }

    if (page === "contact") {
      main.innerHTML = MS.renderContact();
      MS.initScrollReveal(main);
      MS.wireContactForm(main);
      if (typeof MS.mountLeafletMaps === "function") MS.mountLeafletMaps(main);
      if (params.get("sent") === "1") {
        MS.openModal(
          "Сообщение отправлено",
          '<p class="text-muted" style="margin-bottom:1rem">Спасибо! Письмо ушло на почту службы MinskStay. Мы ответим в ближайшее время.</p>' +
            '<button type="button" class="btn btn--primary" id="contact-sent-close">Закрыть</button>'
        );
        var cs = document.getElementById("contact-sent-close");
        if (cs) cs.addEventListener("click", MS.closeModal);
        try {
          history.replaceState({}, "", w.location.pathname);
        } catch (e) {
          /* ignore */
        }
      }
      return;
    }

    if (page === "booking-rules") {
      main.innerHTML = MS.renderBookingRules();
      MS.initScrollReveal(main);
      return;
    }

    if (page === "404") {
      main.innerHTML = MS.render404();
      MS.initScrollReveal(main);
    }
  };
})(window);
