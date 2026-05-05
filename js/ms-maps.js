(function (w) {
  "use strict";
  var MS = w.MS;
  if (!MS) return;

  var TILE_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
  var TILE_OPTS = {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener">OSM</a> &copy; <a href="https://carto.com/attributions" rel="noopener">CARTO</a>',
    subdomains: "abcd",
  };

  var MARKER_STYLE = {
    radius: 7,
    weight: 2,
    color: "hsl(22 78% 42%)",
    fillColor: "hsl(22 78% 48%)",
    fillOpacity: 0.92,
  };

  function esc(s) {
    if (typeof MS.escapeHtml === "function") return MS.escapeHtml(s);
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function wireFullscreen(wrap) {
    var btn = wrap.querySelector(".map-embed__fs");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var fn = wrap.requestFullscreen || wrap.webkitRequestFullscreen || wrap.msRequestFullscreen;
      if (!fn) return;
      var p = fn.call(wrap);
      if (p && typeof p.then === "function") {
        p.then(function () {
          var m = wrap._leafletMap;
          if (m) setTimeout(function () { m.invalidateSize(); }, 200);
        }).catch(function () {});
      } else {
        var m2 = wrap._leafletMap;
        if (m2) setTimeout(function () { m2.invalidateSize(); }, 200);
      }
    });
  }

  function onFsChange(wrap) {
    var m = wrap._leafletMap;
    if (m) setTimeout(function () { m.invalidateSize(); }, 100);
  }

  if (!MS._leafletFsWired) {
    MS._leafletFsWired = true;
    document.addEventListener("fullscreenchange", function () {
      document.querySelectorAll("[data-leaflet-map]").forEach(function (wrap) {
        onFsChange(wrap);
      });
    });
  }

  function addHotelMarkers(map, hotels) {
    var bounds = [];
    hotels.forEach(function (h) {
      var la = parseFloat(h.lat);
      var ln = parseFloat(h.lng);
      if (isNaN(la) || isNaN(ln)) return;
      bounds.push([la, ln]);
      var m = w.L.circleMarker([la, ln], MARKER_STYLE).addTo(map);
      m.bindPopup("<strong>" + esc(h.nameRu || h.name || "Отель") + "</strong>");
    });
    if (bounds.length === 1) {
      map.setView(bounds[0], 14);
    } else if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [28, 28], maxZoom: 14 });
    }
  }

  MS.mountLeafletMaps = function (root) {
    if (!root) return;
    if (typeof w.L === "undefined") {
      root.querySelectorAll("[data-leaflet-map] .map-fallback").forEach(function (fb) {
        fb.removeAttribute("hidden");
      });
      return;
    }
    var wraps = root.querySelectorAll("[data-leaflet-map]");
    wraps.forEach(function (wrap) {
      wireFullscreen(wrap);
      var canvas = wrap.querySelector(".map-embed__canvas");
      var fb = wrap.querySelector(".map-fallback");
      if (!canvas) {
        if (fb) fb.removeAttribute("hidden");
        return;
      }
      var lat = parseFloat(wrap.getAttribute("data-lat") || "53.9");
      var lng = parseFloat(wrap.getAttribute("data-lng") || "27.56");
      var z = parseInt(wrap.getAttribute("data-zoom") || "12", 10);
      var role = wrap.getAttribute("data-map-role") || "single";
      try {
        var map = w.L.map(canvas, { scrollWheelZoom: true }).setView([lat, lng], z);
        w.L.tileLayer(TILE_URL, TILE_OPTS).addTo(map);
        wrap._leafletMap = map;

        if (role === "hotels" && typeof MS.getHotels === "function") {
          var hotels = MS.getHotels();
          if (hotels && hotels.length) addHotelMarkers(map, hotels);
          else {
            var one = w.L.circleMarker([lat, lng], MARKER_STYLE).addTo(map);
            one.bindPopup("Минск");
          }
        } else {
          var title = wrap.getAttribute("data-marker-title") || "MinskStay";
          var om = w.L.circleMarker([lat, lng], MARKER_STYLE).addTo(map);
          om.bindPopup(esc(title));
        }

        if (fb) fb.setAttribute("hidden", "");
      } catch (err) {
        if (fb) fb.removeAttribute("hidden");
      }
    });
  };
})(window);
