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
  
  //  var renderAdverts = function (adverts) {
    var successHandler = function (adverts) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < adverts.length; i++) {
        //  console.log(adverts[i]);
        //var nearbyAdverts = adverts[i];
        fragment.appendChild(createPinElement(adverts[i])).classList.add('map__pin--side');
        console.log(adverts[i]);
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
    
    console.log(mapListElement);
    window.map.mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    mapFiltersElement.classList.remove('map__filters--disabled');
    adFormAddressElement.value = (MAIN_PIN_X_LOCATION + 'px') + ' ' +
    (MAIN_PIN_Y_LOCATION + MAIN_PIN_Y_OFFSET + 'px');
    //  renderAdverts(window.data.advertsArray);
    window.loadData.load(successHandler(), window.loadData.showError);
   
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
    
    var allPinElements = mapListElement.querySelectorAll('.map__pin--side');
    for (var i = 0; i < allPinElements.length; i++) {
      showCardOnCLick(mapListElement[i], allPinElements[i]);
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
