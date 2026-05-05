(function (w) {
  "use strict";
  var M = w.MS;
  var cache = null;

  M.copyFilters = function (f) {
    return {
      sort: f.sort,
      district: f.district,
      category: f.category,
      minStars: f.minStars,
      priceMin: f.priceMin,
      priceMax: f.priceMax,
      minRating: f.minRating,
      types: (f.types || []).slice(),
      maxDistance: f.maxDistance,
      amenities: (f.amenities || []).slice(),
      adults: f.adults,
      children: f.children,
    };
  };

  M.loadHotels = async function () {
    if (cache) return cache;
    if (!w.MinskStayHotels || typeof w.MinskStayHotels.fetchHotelsFromXML !== "function") {
      M._hotelsLoadError = "Не подключён скрипт js/hotels.js — каталог и главная не смогут загрузить данные.";
      cache = [];
      return cache;
    }
    try {
      cache = await w.MinskStayHotels.fetchHotelsFromXML();
      M._hotelsLoadError = null;
    } catch (err) {
      console.error(err);
      cache = [];
      M._hotelsLoadError = err && err.message ? err.message : String(err);
    }
    return cache;
  };

  M.getHotels = function () {
    return cache || [];
  };

  M.catalogState = {
    visibleCount: M.ITEMS_PER_PAGE,
    filters: M.copyFilters(M.defaultFilters),
  };
})(window);
