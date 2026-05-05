(function (w) {
  "use strict";
  var M = w.MS;

  M.escapeHtml = function (s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  };

  M.starSvg = function (width) {
    var w = width || 14;
    return (
      '<svg width="' +
      w +
      '" height="' +
      w +
      '" viewBox="0 0 24 24" fill="currentColor" class="icon-star" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
    );
  };

  M.starsRow = function (n) {
    var h = "";
    for (var i = 0; i < n; i++) h += M.starSvg(14);
    return '<span class="stars-row">' + h + "</span>";
  };

  M.imgTag = function (src, alt, className) {
    var c = className ? ' class="' + M.escapeHtml(className) + '"' : "";
    return (
      '<img src="' +
      M.escapeHtml(src) +
      '" alt="' +
      M.escapeHtml(alt) +
      '"' +
      c +
      ' loading="lazy" onerror="this.onerror=null;this.src=\'' +
      M.PLACEHOLDER +
      "'\"/>"
    );
  };

  M.sortHotels = function (list, sortKey) {
    var arr = list.slice();
    if (sortKey === "price-asc") arr.sort(function (a, b) { return a.price - b.price; });
    else if (sortKey === "price-desc") arr.sort(function (a, b) { return b.price - a.price; });
    else if (sortKey === "stars") arr.sort(function (a, b) { return b.stars - a.stars; });
    else arr.sort(function (a, b) { return b.rating - a.rating; });
    return arr;
  };

  M.filterHotels = function (hotels, f, search) {
    var result = hotels.slice();
    f = f || {};
    var filterTypes = f.types || [];
    var filterAmenities = f.amenities || [];
    if (search && search.trim()) {
      var q = search.toLowerCase();
      result = result.filter(function (h) {
        var amenityStr = (h.amenities || []).join(" ").toLowerCase();
        var catLabel = (M.HOTEL_CATEGORY_LABELS[h.category] || "").toLowerCase();
        return (
          (h.nameRu && h.nameRu.toLowerCase().indexOf(q) !== -1) ||
          (h.name && h.name.toLowerCase().indexOf(q) !== -1) ||
          (h.address && h.address.toLowerCase().indexOf(q) !== -1) ||
          (h.district && h.district.toLowerCase().indexOf(q) !== -1) ||
          (h.description && h.description.toLowerCase().indexOf(q) !== -1) ||
          amenityStr.indexOf(q) !== -1 ||
          (h.category && h.category.toLowerCase().indexOf(q) !== -1) ||
          (catLabel && catLabel.indexOf(q) !== -1)
        );
      });
    }
    if (f.district && f.district !== "all") result = result.filter(function (h) { return h.district === f.district; });
    if (f.category && f.category !== "all") result = result.filter(function (h) { return h.category === f.category; });
    if (f.minStars > 0) result = result.filter(function (h) { return h.stars >= f.minStars; });
    result = result.filter(function (h) {
      return h.price >= f.priceMin && h.price <= f.priceMax;
    });
    if (f.minRating > 0) result = result.filter(function (h) { return h.rating >= f.minRating; });
    if (filterTypes.length > 0) result = result.filter(function (h) { return filterTypes.indexOf(h.type) !== -1; });
    if (f.maxDistance < 20) result = result.filter(function (h) { return h.distanceCenter <= f.maxDistance; });
    if (filterAmenities.length > 0) {
      result = result.filter(function (h) {
        var ha = h.amenities || [];
        return filterAmenities.every(function (am) { return ha.indexOf(am) !== -1; });
      });
    }
    return M.sortHotels(result, f.sort || "rating");
  };

  M.districtsFrom = function (hotels) {
    var s = {};
    hotels.forEach(function (h) {
      if (h.district) s[h.district] = true;
    });
    return Object.keys(s).sort();
  };

  M.amenitiesFrom = function (hotels) {
    var s = {};
    hotels.forEach(function (h) {
      (h.amenities || []).forEach(function (a) {
        if (a) s[a] = true;
      });
    });
    return Object.keys(s).sort();
  };

  M.hotelCardHtml = function (h) {
    var badge =
      h.category && M.HOTEL_CATEGORY_LABELS[h.category]
        ? '<span class="hotel-card__badge hotel-card__badge--' +
          M.escapeHtml(h.category) +
          '">' +
          M.escapeHtml(M.HOTEL_CATEGORY_LABELS[h.category]) +
          "</span>"
        : "";
    return (
      '<article class="hotel-card">' +
      '<div class="hotel-card__media">' +
      M.imgTag(h.images[0] || M.PLACEHOLDER, h.nameRu, "") +
      badge +
      '<span class="hotel-card__price">от ' +
      M.escapeHtml(String(h.price)) +
      " " +
      M.escapeHtml(h.currency) +
      "</span></div>" +
      '<div class="hotel-card__body">' +
      '<div class="hotel-card__stars">' +
      M.starsRow(h.stars) +
      "</div>" +
      '<h3 class="hotel-card__name">' +
      M.escapeHtml(h.nameRu) +
      "</h3>" +
      '<p class="hotel-card__addr">' +
      M.escapeHtml(h.address) +
      "</p>" +
      '<div class="hotel-card__row"><span class="hotel-card__rating">' +
      M.starSvg(14) +
      " " +
      M.escapeHtml(String(h.rating)) +
      '</span><a class="btn btn--primary btn--sm" href="hotel.html?id=' +
      M.escapeHtml(h.id) +
      '">Подробнее <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a></div></div></article>'
    );
  };
})(window);
