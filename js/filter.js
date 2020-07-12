'use strict';

(function () {
  var updateAdverts = function (adverts) {
    var filterFormElement = document.querySelector('.map__filters');
    var housingFilterElement = filterFormElement.querySelector('#housing-type');
    var priceFilterElement = filterFormElement.querySelector('#housing-price');
    var roomsFilterElement = filterFormElement.querySelector('#housing-rooms');
    var guestsFilterElement = filterFormElement.querySelector('#housing-guests');
    var featuresFormElement = filterFormElement.querySelector('#housing-features');
    var mapElement = document.querySelector('.map');
    var mapListElement = mapElement.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    filterFormElement.addEventListener('change', window.debounce (function () {
      var pinsElement = Array.from(document.querySelectorAll('.map__pin--side'));
      var popupElement = document.querySelector('.popup');

      if (popupElement !== null) {
        popupElement.style.display = 'none';
      }

      if (pinsElement !== null) {
        for (var i = 0; i < pinsElement.length; i++) {
          pinsElement[i].remove();
        }
      }

      var typeArray = adverts.filter(function (it) {
        if (housingFilterElement.value === 'any') {
          return adverts;
        } else {
          return it.offer.type === housingFilterElement.value;
        }
      });

      var priceArray = typeArray.filter(function (it) {
        if (priceFilterElement.value === 'any') {
          return typeArray;
        } else if (priceFilterElement.value === 'middle') {
          return (it.offer.price >= 10000 && it.offer.price <= 50000);
        } else if (priceFilterElement.value === 'low') {
          return (it.offer.price < 10000);
        } else {
          return (it.offer.price > 50000);
        }
      });

      var roomsArray = priceArray.filter(function (it) {
        if (roomsFilterElement.value === 'any') {
          return priceArray;
        } else if (roomsFilterElement.value === '1') {
          return it.offer.rooms === 1;
        } else if (roomsFilterElement.value === '2') {
          return it.offer.rooms === 2;
        } else {
          return it.offer.rooms === 3;
        }
      });

      var guestsArray = roomsArray.filter(function (it) {
        if (guestsFilterElement.value === 'any') {
          return roomsArray;
        } else if (guestsFilterElement.value === '1') {
          return it.offer.guests === 1;
        } else if (guestsFilterElement.value === '2') {
          return it.offer.guests === 2;
        } else {
          return it.offer.guests === 0;
        }
      });

      var featuresArray = guestsArray.filter(function (it) {
        if (featuresFormElement.querySelector('#filter-wifi').checked) {
          return it.offer.features.includes('wifi');
        } else if (featuresFormElement.querySelector('#filter-dishwasher').checked) {
          return it.offer.features.includes('dishwasher');
        } else if (featuresFormElement.querySelector('#filter-parking').checked) {
          return it.offer.features.includes('parking');
        } else if (featuresFormElement.querySelector('#filter-washer').checked) {
          return it.offer.features.includes('washer');
        } else if (featuresFormElement.querySelector('#filter-elevator').checked) {
          return it.offer.features.includes('elevator');
        } else if (featuresFormElement.querySelector('#filter-conditioner').checked) {
          return it.offer.features.includes('conditioner');
        } else {
          return guestsArray;
        }
      });

      var lengthOfArray = featuresArray.slice(0, 5).length;

      window.map.advertsArray = [];

      for (var j = 0; j < lengthOfArray; j++) {
        fragment.appendChild(window.map.createPinElement(featuresArray[j], j)).classList.add('map__pin--side');
        window.map.advertsArray.push(featuresArray[j]);
      }

      mapListElement.appendChild(fragment);
    }));

    return window.map.advertsArray;
  };

  window.filter = {
    updateAdverts: updateAdverts
  };
})();


