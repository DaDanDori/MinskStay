(function (w) {
  "use strict";
  var M = w.MS;

  function uniqueDistricts(hotels) {
    var m = {};
    hotels.forEach(function (h) {
      if (h.district) m[h.district] = 1;
    });
    return Object.keys(m).sort();
  }

  function cardHtml(h, i) {
    var delay = (i % 6) * 60;
    var cat = h.category || "";
    var badge =
      cat === "luxury"
        ? '<span class="hotel-card__badge hotel-card__badge--luxury">Премиум</span>'
        : cat === "business"
          ? '<span class="hotel-card__badge hotel-card__badge--business">Бизнес</span>'
          : '<span class="hotel-card__badge hotel-card__badge--budget">Эконом</span>';
    return (
      '<div class="scroll-reveal" style="transition-delay:' +
      delay +
      'ms"><article class="hotel-card"><div class="hotel-card__media">' +
      badge +
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
      '</p><div class="hotel-card__rating">' +
      M.starSvg(14) +
      M.escapeHtml(String(h.rating)) +
      '</div><a class="btn btn--primary btn--sm" href="hotel.html?id=' +
      M.escapeHtml(h.id) +
      '">Подробнее</a></div></article></div>'
    );
  }

  M.renderCatalog = function (hotels) {
    var dists = uniqueDistricts(hotels);
    var f = M.catalogState.filters;
    var distOpts = [
      '<option value="all"' + (f.district === "all" ? " selected" : "") + ">Все районы</option>",
    ]
      .concat(
        dists.map(function (d) {
          return (
            '<option value="' +
            M.escapeHtml(d) +
            '"' +
            (f.district === d ? " selected" : "") +
            ">" +
            M.escapeHtml(d) +
            "</option>"
          );
        })
      )
      .join("");

    var typeChecks = M.PROPERTY_TYPES.map(function (pt) {
      var on = f.types.indexOf(pt.value) >= 0;
      return (
        '<label class="filters__checkbox"><input type="checkbox" data-filter-type="' +
        M.escapeHtml(pt.value) +
        '"' +
        (on ? " checked" : "") +
        "/><span>" +
        M.escapeHtml(pt.label) +
        "</span></label>"
      );
    }).join("");

    var catOpts = M.HOTEL_CATEGORIES.map(function (c) {
      return (
        '<option value="' +
        M.escapeHtml(c.value) +
        '"' +
        (f.category === c.value ? " selected" : "") +
        ">" +
        M.escapeHtml(c.label) +
        "</option>"
      );
    }).join("");

    return (
      '<div class="page page--catalog">' +
      '<section class="catalog-hero catalog-hero--enhanced bg-hero-gradient">' +
      '<div class="container" style="text-align:center">' +
      '<h1 class="catalog-hero__title font-display">Каталог отелей</h1>' +
      '<p class="catalog-hero__lead">Фильтры, поиск и актуальные цены в Минске</p></div></section>' +
      '<section class="section section--catalog"><div class="container">' +
      '<div class="catalog-toolbar">' +
      '<div class="catalog-toolbar__search-wrap">' +
      '<div class="catalog-search">' +
      '<svg class="catalog-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<input type="search" id="catalog-q" class="catalog-search__input" placeholder="Название, адрес или район…" autocomplete="off"/>' +
      "</div></div>" +
      '<button type="button" class="btn btn--primary catalog-toolbar__btn" id="catalog-search-btn">Найти</button></div>' +
      '<p class="catalog-hint">Используйте фильтры слева на больших экранах или прокрутите к сетке на мобильных.</p>' +
      '<p class="catalog-meta" id="catalog-meta" role="status"></p>' +
      '<div class="catalog-layout">' +
      '<aside class="filters">' +
      '<div class="filters__panel">' +
      '<h2 class="filters__title">Фильтры</h2>' +
      '<div class="filters__group"><label class="filters__label" for="filter-sort">Сортировка</label>' +
      '<select id="filter-sort" class="filters__select">' +
      '<option value="rating"' +
      (f.sort === "rating" ? " selected" : "") +
      ">По рейтингу</option>" +
      '<option value="price-asc"' +
      (f.sort === "price-asc" ? " selected" : "") +
      ">Цена ↑</option>" +
      '<option value="price-desc"' +
      (f.sort === "price-desc" ? " selected" : "") +
      ">Цена ↓</option>" +
      '<option value="stars"' +
      (f.sort === "stars" ? " selected" : "") +
      ">По звёздам</option></select></div>" +
      '<div class="filters__group"><label class="filters__label" for="filter-district">Район</label>' +
      '<select id="filter-district" class="filters__select">' +
      distOpts +
      "</select></div>" +
      '<div class="filters__group"><label class="filters__label" for="filter-category">Категория</label>' +
      '<select id="filter-category" class="filters__select">' +
      catOpts +
      "</select></div>" +
      '<div class="filters__group"><span class="filters__label">Тип</span><div class="filters__amenities">' +
      typeChecks +
      "</div></div>" +
      '<div class="filters__group"><label class="filters__label" for="filter-stars">Мин. звёзд</label>' +
      '<select id="filter-stars" class="filters__select">' +
      [0, 1, 2, 3, 4, 5]
        .map(function (n) {
          return (
            '<option value="' +
            n +
            '"' +
            (f.minStars === n ? " selected" : "") +
            ">" +
            (n === 0 ? "Любое" : n + "+") +
            "</option>"
          );
        })
        .join("") +
      "</select></div>" +
      '<div class="filters__group"><label class="filters__label">Цена за ночь (BYN)</label>' +
      '<div class="filters__row"><span>' +
      f.priceMin +
      "</span><span>" +
      f.priceMax +
      '</span></div><input type="range" id="filter-price-max" class="filters__range" min="30" max="350" step="10" value="' +
      f.priceMax +
      '"/></div>' +
      '<div class="filters__group"><label class="filters__label" for="filter-rating">Мин. оценка</label>' +
      '<select id="filter-rating" class="filters__select">' +
      [0, 3, 3.5, 4, 4.5]
        .map(function (r) {
          return (
            '<option value="' +
            r +
            '"' +
            (f.minRating === r ? " selected" : "") +
            ">" +
            (r === 0 ? "Любая" : String(r) + "+") +
            "</option>"
          );
        })
        .join("") +
      "</select></div>" +
      '<button type="button" class="filters__reset" id="filter-reset">Сбросить фильтры</button></div></aside>' +
      '<div style="flex:1;min-width:0"><div class="catalog-grid" id="catalog-grid"></div>' +
      '<div class="text-center mt-8" id="catalog-more-wrap" hidden><button type="button" class="btn btn--outline-primary" id="catalog-more">Показать ещё</button></div></div>' +
      "</div></div></section></div>"
    );
  };

  function readFiltersFromDom(root) {
    var f = M.catalogState.filters;
    var sortEl = root.querySelector("#filter-sort");
    var distEl = root.querySelector("#filter-district");
    var catEl = root.querySelector("#filter-category");
    var starsEl = root.querySelector("#filter-stars");
    var rateEl = root.querySelector("#filter-rating");
    var priceEl = root.querySelector("#filter-price-max");
    if (sortEl) f.sort = sortEl.value;
    if (distEl) f.district = distEl.value;
    if (catEl) f.category = catEl.value;
    if (starsEl) f.minStars = parseInt(starsEl.value, 10) || 0;
    if (rateEl) f.minRating = parseFloat(rateEl.value) || 0;
    if (priceEl) f.priceMax = parseInt(priceEl.value, 10) || 350;
    f.types = [];
    root.querySelectorAll("[data-filter-type]:checked").forEach(function (cb) {
      f.types.push(cb.getAttribute("data-filter-type"));
    });
  }

  function applyCatalog(root, allHotels) {
    var qEl = root.querySelector("#catalog-q");
    var q = qEl ? qEl.value : "";
    readFiltersFromDom(root);
    var f = M.catalogState.filters;
    var list = M.filterHotels(allHotels, f, q);
    list = M.sortHotels(list, f.sort);
    var total = list.length;
    var n = M.catalogState.visibleCount;
    var slice = list.slice(0, n);
    var grid = root.querySelector("#catalog-grid");
    var meta = root.querySelector("#catalog-meta");
    var moreWrap = root.querySelector("#catalog-more-wrap");
    if (grid) {
      grid.innerHTML = slice.map(function (h, i) { return cardHtml(h, i); }).join("") || '<p class="text-muted">Ничего не найдено — измените фильтры.</p>';
    }
    if (meta) {
      meta.innerHTML = "Найдено: <strong>" + total + "</strong> " + (total === 1 ? "объект" : total < 5 ? "объекта" : "объектов");
    }
    if (moreWrap) {
      moreWrap.hidden = slice.length >= total;
    }
    M.initScrollReveal(root.querySelector(".catalog-grid") || root);
  }

  M.wireCatalog = function (root, allHotels) {
    M.catalogState.visibleCount = M.ITEMS_PER_PAGE;
    applyCatalog(root, allHotels);

    function go() {
      applyCatalog(root, allHotels);
    }

    root.addEventListener("change", function (e) {
      if (e.target.closest(".filters__panel") || e.target.id === "filter-price-max") {
        M.catalogState.visibleCount = M.ITEMS_PER_PAGE;
        go();
      }
    });

    root.addEventListener("click", function (e) {
      if (e.target.id === "catalog-more") {
        M.catalogState.visibleCount += M.ITEMS_PER_PAGE;
        go();
      }
      if (e.target.id === "filter-reset") {
        M.catalogState.filters = M.copyFilters(M.defaultFilters);
        M.catalogState.visibleCount = M.ITEMS_PER_PAGE;
        var parent = root.parentNode;
        if (parent) {
          var fresh = document.createElement("main");
          fresh.id = "main-content";
          fresh.innerHTML = M.renderCatalog(allHotels);
          parent.replaceChild(fresh, root);
          M.initScrollReveal(fresh);
          M.wireCatalog(fresh, allHotels);
        }
      }
      if (e.target.id === "catalog-search-btn") go();
    });

    var qEl = root.querySelector("#catalog-q");
    if (qEl) {
      qEl.addEventListener("input", function () {
        M.catalogState.visibleCount = M.ITEMS_PER_PAGE;
        go();
      });
    }
  };
})(window);
