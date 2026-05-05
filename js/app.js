
(function () {
  "use strict";
  var MS = window.MS;

  document.addEventListener("DOMContentLoaded", function () {
    if (!MS || typeof MS.runPage !== "function") return;
    MS.runPage().catch(function (err) {
      console.error(err);
      var main = document.getElementById("main-content");
      if (!main) return;
      var msg = err && err.message ? err.message : String(err);
      var esc = typeof MS.escapeHtml === "function" ? MS.escapeHtml : function (s) { return String(s); };
      main.innerHTML =
        '<div class="container section" style="padding:3rem 1rem">' +
        '<h2 class="font-display">Ошибка загрузки</h2>' +
        '<p class="text-muted">' +
        esc(msg) +
        "</p><p><a class=\"btn btn--primary\" href=\"index.html\">На главную</a></p></div>";
    });
  });
})();
