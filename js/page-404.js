(function (w) {
  "use strict";
  var M = w.MS;

  M.render404 = function () {
    return (
      '<div class="page page-404 container" style="padding:4rem 1rem;text-align:center">' +
      '<h1 class="font-display">Страница не найдена</h1>' +
      '<p>Похоже, этой страницы не существует или ссылка устарела.</p>' +
      '<p><a class="btn btn--primary" href="index.html">На главную</a> ' +
      '<a class="btn btn--outline-primary" href="catalog.html">Каталог</a></p></div>'
    );
  };
})(window);
