'use strict';

(function () {
  var updateAdverts = function (adverts) {
    var MAX_VISIBLE_ADVERTS = 5;

    var filterFormElement = document.querySelector('.map__filters');
    var mapElement = document.querySelector('.map');
    var mapListElement = mapElement.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    var onFilterFormElementChange = function () {
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

      var priceMap = {
        'low': {
          start: 0,
          end: 10000
        },
        'middle': {
          start: 10000,
          end: 50000
        },
        'high': {
          start: 50000,
          end: Infinity
        }
      };

      var filterElements = Array.from(document.querySelector('.map__filters').children);

      var filterRules = {
        'housing-type': function (data, filter) {
          return filter.value === data.offer.type;
        },

        'housing-price': function (data, filter) {
          return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
        },

        'housing-rooms': function (data, filter) {
          return filter.value === data.offer.rooms.toString();
        },

        'housing-guests': function (data, filter) {
          return filter.value === data.offer.guests.toString();
        },

        'housing-features': function (data, filter) {
          var checkboxListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

          return checkboxListElements.every(function (it) {
            return data.offer.features.some(function (feature) {
              return feature === it.value;
            });
          });
        },
      };

      var filterData = function (data) {
        return data.filter(function (item) {
          return filterElements.every(function (filter) {
            return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
          });
        });
      };

      var featuresArray = filterData(adverts);

      var lengthOfArray = featuresArray.slice(0, MAX_VISIBLE_ADVERTS).length;

      window.map.advertsArray = [];

      for (var i = 0; i < lengthOfArray; i++) {
        fragment.appendChild(window.map.createPinElement(featuresArray[i], i)).classList.add('map__pin--side');
        window.map.advertsArray.push(featuresArray[i]);
      }

      mapListElement.appendChild(fragment);
    };

    filterFormElement.addEventListener('change', window.debounce(onFilterFormElementChange));
  };

  window.filter = {
    updateAdverts: updateAdverts
  };
})();
