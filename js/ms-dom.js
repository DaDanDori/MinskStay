(function (w) {
  "use strict";
  var M = w.MS;

  M.escapeHtml = function (s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  M.starSvg = function (size) {
    return (
      '<svg class="icon-star" width="' +
      size +
      '" height="' +
      size +
      '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
    );
  };

  M.starsRow = function (n) {
    var out = "";
    var c = Math.max(0, Math.min(5, parseInt(n, 10) || 0));
    for (var i = 0; i < c; i++) out += M.starSvg(14);
    return out;
  };

  M.imgTag = function (src, alt, cls) {
    var c = cls ? ' class="' + M.escapeHtml(cls) + '"' : "";
    return (
      '<img src="' +
      M.escapeHtml(src) +
      '" alt="' +
      M.escapeHtml(alt) +
      '"' +
      c +
      ' loading="lazy" decoding="async" />'
    );
  };
})(window);
