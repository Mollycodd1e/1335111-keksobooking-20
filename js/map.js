'use strict';

(function () {
  var MAIN_PIN_X_LOCATION = 601;
  var MAIN_PIN_Y_LOCATION = 406;
  var MAIN_PIN_Y_OFFSET = 53;

  var mapElement = document.querySelector('.map');
  var mapListElement = mapElement.querySelector('.map__pins');
  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPinElement = function (array) {
    var objectElement = pinElement.cloneNode(true);
    objectElement.style.left = array.location.x + 'px';
    objectElement.style.top = array.location.y + 'px';
    objectElement.querySelector('img').src = array.author.avatar;
    objectElement.querySelector('img').alt = array.offer.title;

    return objectElement;
  };

  var renderAdverts = function (count) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count.length; i++) {
      fragment.appendChild(createPinElement(window.data.advertsArray[i])).classList.add('map__pin--side');

    }
    mapListElement.appendChild(fragment);
  };

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var formFieldsetsElement = adFormElement.children;
  var mapFiltersElement = document.querySelector('.map__filters');
  var formSelectsElement = mapFiltersElement.children;
  var adFormAddressElement = adFormElement.querySelector('input[name="address"]');

  var activeState = function () {
    window.map.mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    mapFiltersElement.classList.remove('map__filters--disabled');
    adFormAddressElement.value = (MAIN_PIN_X_LOCATION + 'px') + ' ' +
    (MAIN_PIN_Y_LOCATION + MAIN_PIN_Y_OFFSET + 'px');
    renderAdverts(window.data.advertsArray);
    window.form.removeDisabledElements(formFieldsetsElement);
    window.form.removeDisabledElements(formSelectsElement);
    mapPinMainElement.setAttribute('disabled', 'disabled');

    var showCardOnCLick = function (card, button) {
      button.addEventListener('click', function () {
        var openedCard = document.querySelector('.map__card');

        if (openedCard !== null) {
          openedCard.remove();
        }

        window.card.renderCards(card);

        var closeCard = document.querySelector('.popup__close');

        closeCard.addEventListener('click', function () {
          document.querySelector('.map__card').style.display = 'none';
        });

        document.addEventListener('keydown', function (evt) {
          if (evt.key === 'Escape') {
            document.querySelector('.map__card').style.display = 'none';
          }
        });
      });
    };

    var allPinElements = document.querySelectorAll('.map__pin--side');
    console.log(window.data.advertsArray.length);
    for (var i = 0; i < window.data.advertsArray.length; i++) {
      showCardOnCLick(window.data.advertsArray[i], allPinElements[i]);
    }
  };

  mapPinMainElement.addEventListener('mousedown', function (mouseButton) {
    if (mouseButton.button === 0) {
      activeState();
    }
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activeState();
    }
  });

  window.map = {
    mapElement: mapElement,
    MAIN_PIN_X_LOCATION: MAIN_PIN_X_LOCATION,
    MAIN_PIN_Y_LOCATION: MAIN_PIN_Y_LOCATION
  };
})();
