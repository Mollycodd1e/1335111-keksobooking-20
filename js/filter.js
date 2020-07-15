'use strict';

(function () {
  var updateAdverts = function (adverts) {
    var MIN_MIDDLE_PRICE_VALUE = 10000;
    var MAX_MIDDLE_PRICE_VALUE = 50000;
    var MIN_ROOMS_NUMBER = 1;
    var MID_ROOMS_NUMBER = 2;
    var MAX_ROOMS_NUMBER = 3;
    var MIN_GUEST_NUMBER = 0;
    var MID_GUEST_NUMBER = 1;
    var MAX_GUEST_NUMBER = 2;

    var guests = {
      none: 0,
      one: 1,
      two: 2
    };

    var rooms = {
      one: 1,
      two: 2,
      three: 3
    };

    var filterFormElement = document.querySelector('.map__filters');
    var housingFilterElement = filterFormElement.querySelector('#housing-type');
    var priceFilterElement = filterFormElement.querySelector('#housing-price');
    var roomsFilterElement = filterFormElement.querySelector('#housing-rooms');
    var guestsFilterElement = filterFormElement.querySelector('#housing-guests');
    var featuresFormElement = filterFormElement.querySelector('#housing-features');
    var mapElement = document.querySelector('.map');
    var mapListElement = mapElement.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    filterFormElement.addEventListener('change', window.debounce(function () {
      var pinsElement = Array.from(document.querySelectorAll('.map__pin--side'));
      var popupElement = document.querySelector('.popup');

      if (popupElement !== null) {
        popupElement.style.display = 'none';
      }

      if (pinsElement !== null) {
        pinsElement.forEach(function (element) {
          element.remove();
        });
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
          return (it.offer.price >= MIN_MIDDLE_PRICE_VALUE && it.offer.price <= MAX_MIDDLE_PRICE_VALUE);
        } else if (priceFilterElement.value === 'low') {
          return (it.offer.price < MIN_MIDDLE_PRICE_VALUE);
        } else {
          return (it.offer.price > MAX_MIDDLE_PRICE_VALUE);
        }
      });

      var roomsArray = priceArray.filter(function (it) {
        if (roomsFilterElement.value === 'any') {
          return priceArray;
        } else if (roomsFilterElement.value === '' + rooms.one) {
          return it.offer.rooms === MIN_ROOMS_NUMBER;
        } else if (roomsFilterElement.value === '' + rooms.two) {
          return it.offer.rooms === MID_ROOMS_NUMBER;
        } else {
          return it.offer.rooms === MAX_ROOMS_NUMBER;
        }
      });

      var guestsArray = roomsArray.filter(function (it) {
        if (guestsFilterElement.value === 'any') {
          return roomsArray;
        } else if (guestsFilterElement.value === '' + guests.one) {
          return it.offer.guests === MID_GUEST_NUMBER;
        } else if (guestsFilterElement.value === '' + guests.two) {
          return it.offer.guests === MAX_GUEST_NUMBER;
        } else {
          return it.offer.guests === MIN_GUEST_NUMBER;
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


