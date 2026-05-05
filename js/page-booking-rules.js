(function (w) {
  "use strict";
  var M = w.MS;
  var BAR = ["a", "b", "c"];

  M.renderBookingRules = function () {
    var steps = M.BOOKING_STEPS.map(function (step, i) {
      var rev = i % 2 === 1 ? " step-row--reverse" : "";
      return (
        '<div class="step-row scroll-reveal' +
        rev +
        '" style="transition-delay:' +
        i * 80 +
        'ms">' +
        '<div class="step-row__num">' +
        step.num +
        '</div><div class="step-row__card"><h3 class="font-display" style="margin:0 0 0.5rem;font-size:1.35rem">' +
        M.escapeHtml(step.title) +
        '</h3><p class="text-muted" style="margin:0;line-height:1.6">' +
        M.escapeHtml(step.desc) +
        "</p></div></div>"
      );
    }).join("");

    var discounts = M.DISCOUNTS.map(function (d, i) {
      var bar = BAR[i] || "c";
      return (
        '<article class="discount-card scroll-reveal" style="transition-delay:' +
        i * 70 +
        'ms"><div class="discount-card__bar discount-card__bar--' +
        bar +
        '"></div><div class="discount-card__badge">' +
        d.percent +
        '%</div><div class="discount-card__body"><h3 class="discount-card__title">' +
        M.escapeHtml(d.title) +
        '</h3><p class="discount-card__text">' +
        M.escapeHtml(d.desc) +
        "</p></div></article>"
      );
    }).join("");

    return (
      '<div class="page page--booking">' +
      '<section class="catalog-hero catalog-hero--enhanced bg-hero-gradient">' +
      '<div class="container" style="text-align:center">' +
      '<h1 class="catalog-hero__title font-display">Правила бронирования</h1>' +
      '<p class="catalog-hero__lead">Этапы оформления и действующие скидки</p></div></section>' +
      '<section class="section"><div class="container steps-zigzag">' +
      steps +
      '</div></section>' +
      '<section class="section section--muted-gradient"><div class="container">' +
      '<h2 class="font-display section-head__title scroll-reveal" style="margin:0 0 1.5rem">Скидки и акции</h2>' +
      '<div class="discounts-grid">' +
      discounts +
      "</div></div></section></div>"
    );
  };
})(window);
