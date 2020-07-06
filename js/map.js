'use strict';

(function () {
  var MAIN_PIN_X_LOCATION = 601;
  var MAIN_PIN_Y_LOCATION = 406;
  var MAIN_PIN_Y_OFFSET = 53;
  var MAX_DISPLAYED_ADVERTS = 5;

  var mapElement = document.querySelector('.map');
  var mapListElement = mapElement.querySelector('.map__pins');
  var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');

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

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var formFieldsetsElement = adFormElement.children;
  var mapFiltersElement = document.querySelector('.map__filters');
  var formSelectsElement = mapFiltersElement.children;
  var adFormAddressElement = adFormElement.querySelector('input[name="address"]');

  var activateState = function () {
    window.map.mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    mapFiltersElement.classList.remove('map__filters--disabled');
    adFormAddressElement.value = (MAIN_PIN_X_LOCATION + 'px') + ' ' +
    (MAIN_PIN_Y_LOCATION + MAIN_PIN_Y_OFFSET + 'px');
    window.loadData.load(successHandler, window.loadData.errorHandler);
    window.form.removeDisabledElements(formFieldsetsElement);
    window.form.removeDisabledElements(formSelectsElement);
    //mapPinMainElement.setAttribute('disabled', 'disabled');
    //window.move.movePin();
    mapPinMainElement.addEventListener('mousedown', window.move.movePin());
  };

  mapListElement.addEventListener('click', function (evt) {
    var target = evt.target;
    var numPin = target.parentElement.dataset.numPin;
    var openedCard = document.querySelector('.map__card');

    if (numPin) {

      if (openedCard !== null) {
        openedCard.remove();
      }
      
      window.card.renderCards(advertsArray[numPin]);

      var closeCard = document.querySelector('.popup__close');

      closeCard.addEventListener('click', function () {
        document.querySelector('.map__card').style.display = 'none';
      });

      document.addEventListener('keydown', function (evtBoard) {
        if (evtBoard.key === 'Escape') {
          document.querySelector('.map__card').style.display = 'none';
        }
      });
    }
  });

  mapPinMainElement.addEventListener('mousedown', function (mouseButton) {
    if (mouseButton.button === 0) {
      activateState();
    }
  });

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activateState();
    }
  });

  window.map = {
    mapElement: mapElement,
    MAIN_PIN_X_LOCATION: MAIN_PIN_X_LOCATION,
    MAIN_PIN_Y_LOCATION: MAIN_PIN_Y_LOCATION,
    advertsArray: advertsArray,
    createPinElement: createPinElement
  };
})();
