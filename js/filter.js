'use strict';

(function () {
  var updateAdverts = function (adverts) {
    var filterFormElement = document.querySelector('.map__filters');
    var housingFilterElement = filterFormElement.querySelector('#housing-type');
    var mapElement = document.querySelector('.map');
    var mapListElement = mapElement.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    housingFilterElement.addEventListener('change', function () {
      var pinsElement = Array.from(document.querySelectorAll('.map__pin--side'));
      var popup = document.querySelector('.popup');

      if (popup !== null) {
        popup.style.display = 'none';
      }

      if (pinsElement !== null) {
        for (var i = 0; i < pinsElement.length; i++) {
          pinsElement[i].remove();
        }
      }

      var filterArray = adverts.filter(function (it) {
        if (housingFilterElement.value === 'any') {
          return adverts;
        } else {
          return it.offer.type === housingFilterElement.value;
        }
      });

      var lengthOfArray = filterArray.slice(0, 5).length;

      window.map.advertsArray = [];

      for (var j = 0; j < lengthOfArray; j++) {
        fragment.appendChild(window.map.createPinElement(filterArray[j], j)).classList.add('map__pin--side');
        window.map.advertsArray.push(filterArray[j]);
      }

      mapListElement.appendChild(fragment);
    });
    return window.map.advertsArray;
  };

  window.filter = {
    updateAdverts: updateAdverts
  };
})();


