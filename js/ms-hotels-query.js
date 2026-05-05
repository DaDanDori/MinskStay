(function (w) {
  "use strict";
  var M = w.MS;

  M.filterHotels = function (hotels, f, q) {
    q = (q || "").trim().toLowerCase();
    return hotels.filter(function (h) {
      if (q) {
        var hay = (h.nameRu + " " + h.address + " " + h.district).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      if (f.category !== "all" && h.category !== f.category) return false;
      if (f.district !== "all" && h.district !== f.district) return false;
      if (h.stars < f.minStars) return false;
      if (h.price < f.priceMin || h.price > f.priceMax) return false;
      if (h.rating < f.minRating) return false;
      if (h.distanceCenter > f.maxDistance) return false;
      if (f.types && f.types.length && f.types.indexOf(h.type) === -1) return false;
      if (f.amenities && f.amenities.length) {
        for (var i = 0; i < f.amenities.length; i++) {
          if (h.amenities.indexOf(f.amenities[i]) === -1) return false;
        }
      }
      return true;
    });
  };

  M.sortHotels = function (hotels, sort) {
    var arr = hotels.slice();
    if (sort === "price-asc") arr.sort(function (a, b) { return a.price - b.price; });
    else if (sort === "price-desc") arr.sort(function (a, b) { return b.price - a.price; });
    else if (sort === "stars") arr.sort(function (a, b) { return b.stars - a.stars; });
    else arr.sort(function (a, b) { return b.rating - a.rating; });
    return arr;
  };
})(window);
