'use strict';

(function () {
  var MAIN_PIN_X_LOCATION_CENTER = 601;
  var MAIN_PIN_Y_LOCATION_CENTER = 406;
  var MAIN_PIN_Y_OFFSET = 53;
  var MAX_DISPLAYED_ADVERTS = 5;

  var mapElement = document.querySelector('.map');
  var mapListElement = mapElement.querySelector('.map__pins');
  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var formFieldsetsElement = adFormElement.children;
  var mapFiltersElement = document.querySelector('.map__filters');
  var formSelectsElement = mapFiltersElement.children;
  var adFormAddressElement = adFormElement.querySelector('input[name="address"]');

  var createPinElement = function (array, index) {
    var objectElement = pinElement.cloneNode(true);
    objectElement.style.left = array.location.x + 'px';
    objectElement.style.top = array.location.y + 'px';
    objectElement.querySelector('img').src = array.author.avatar;
    objectElement.querySelector('img').alt = array.offer.title;
    objectElement.dataset.numPin = index;

    return objectElement;
  };

  var advertsArray = [];

  var successHandler = function (data) {
    var fragment = document.createDocumentFragment();

    window.filter.updateAdverts(data);

    for (var i = 0; i < MAX_DISPLAYED_ADVERTS; i++) {
      fragment.appendChild(createPinElement(data[i], i)).classList.add('map__pin--side');
      advertsArray.push(data[i]);
    }

    mapListElement.appendChild(fragment);
  };

  var activateState = function () {
    window.map.mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    mapFiltersElement.classList.remove('map__filters--disabled');
    adFormAddressElement.value = (MAIN_PIN_X_LOCATION_CENTER + 'px') + ' ' +
    (MAIN_PIN_Y_LOCATION_CENTER + MAIN_PIN_Y_OFFSET + 'px');
    window.backend.load(successHandler, window.backend.errorHandler);
    window.form.removeDisabledElements(formFieldsetsElement);
    window.form.removeDisabledElements(formSelectsElement);
    mapPinMainElement.addEventListener('mousedown', window.move.movePin);
  };

  var openCard = function (evt) {
    var target = evt.target;
    var numPin = target.parentElement.dataset.numPin;

    if (evt.key === 'Enter') {
      numPin = target.dataset.numPin;
    }

    var openedCardElement = document.querySelector('.map__card');

    if (numPin) {

      if (openedCardElement !== null) {
        openedCardElement.remove();
      }

      window.popup.render(window.map.advertsArray[numPin]);

      var closeCardElement = document.querySelector('.popup__close');

      closeCardElement.addEventListener('click', function () {
        document.querySelector('.map__card').style.display = 'none';
      });

      document.addEventListener('keydown', function (evtBoard) {
        if (evtBoard.key === 'Escape') {
          document.querySelector('.map__card').style.display = 'none';
        }
      });
    }
  };

  mapListElement.addEventListener('click', function (evt) {
    openCard(evt);
  });

  mapListElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openCard(evt);
    }
  });

  mapPinMainElement.addEventListener('mousedown', function (mouseButton) {
    if (mouseButton.button === 0 && window.map.mapElement.classList.contains('map--faded')) {
      activateState();
    }
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && window.map.mapElement.classList.contains('map--faded')) {
      activateState();
    }
  });

  window.map = {
    mapElement: mapElement,
    MAIN_PIN_X_LOCATION_CENTER: MAIN_PIN_X_LOCATION_CENTER,
    MAIN_PIN_Y_LOCATION_CENTER: MAIN_PIN_Y_LOCATION_CENTER,
    advertsArray: advertsArray,
    createPinElement: createPinElement
  };
})();
