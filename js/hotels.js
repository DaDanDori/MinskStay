(function (global) {
  "use strict";

  /**
   * @returns {Promise<Array<{
   *   id: string, name: string, nameRu: string, stars: number, price: number,
   *   currency: string, address: string, district: string, lat: number, lng: number,
   *   description: string, amenities: string[], rating: number, reviews: number,
   *   images: string[], category: string, type: string, distanceCenter: number
   * }>>}
   */
  async function fetchHotelsFromXML() {
    var url = new URL("hotels.xml", global.location.href).href;
    var response = await fetch(url);
    if (!response.ok) {
      throw new Error("Не удалось загрузить hotels.xml (код " + response.status + "). Откройте сайт через локальный сервер.");
    }
    var text = await response.text();
    var parser = new DOMParser();
    var xml = parser.parseFromString(text, "application/xml");
    var perr = xml.querySelector("parsererror");
    if (perr) {
      throw new Error("Файл hotels.xml повреждён или не является XML.");
    }
    var hotelNodes = xml.querySelectorAll("hotel");
    var hotels = [];

    hotelNodes.forEach(function (node) {
      function getText(tag) {
        var el = node.querySelector(tag);
        return el && el.textContent ? el.textContent.trim() : "";
      }
      var imageNodes = node.querySelectorAll("images > image");
      var images = [];
      imageNodes.forEach(function (img) {
        var raw = img.textContent ? img.textContent.trim() : "";
        images.push(raw.replace(/\\/g, "/"));
      });

      hotels.push({
        id: node.getAttribute("id") || "",
        name: getText("name"),
        nameRu: getText("nameRu"),
        stars: parseInt(getText("stars"), 10) || 0,
        price: parseInt(getText("price"), 10) || 0,
        currency: getText("currency"),
        address: getText("address"),
        district: getText("district"),
        lat: parseFloat(getText("lat")) || 0,
        lng: parseFloat(getText("lng")) || 0,
        description: getText("description"),
        amenities: getText("amenities")
          .split(",")
          .map(function (a) {
            return a.trim();
          })
          .filter(Boolean),
        rating: parseFloat(getText("rating")) || 0,
        reviews: parseInt(getText("reviews"), 10) || 0,
        images: images,
        category: getText("category"),
        type: getText("type") || "hotel",
        distanceCenter: parseFloat(getText("distanceCenter")) || 0,
      });
    });

    return hotels;
  }

  function findHotelById(hotels, id) {
    for (var i = 0; i < hotels.length; i++) {
      if (hotels[i].id === id) return hotels[i];
    }
    return null;
  }

  global.MinskStayHotels = {
    fetchHotelsFromXML: fetchHotelsFromXML,
    findHotelById: findHotelById,
  };
})(window);
