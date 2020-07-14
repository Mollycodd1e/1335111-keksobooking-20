'use strict';

(function () {
  var MAIN_PIN_CENTER_LOCATION_X = 570;
  var MAIN_PIN_CENTER_LOCATION_Y = 375;
  var MIN_FLAT_PRICE = 1000;
  var MIN_BUNGALO_PRICE = 0;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var formFieldsetsElement = adFormElement.children;
  var mapFiltersElement = document.querySelector('.map__filters');
  var formSelectsElement = mapFiltersElement.children;
  var adFormAddressElement = adFormElement.querySelector('input[name="address"]');
  var roomNumberInputElement = adFormElement.querySelector('#room_number');
  var guestNumberInputElement = adFormElement.querySelector('#capacity');
  var roomOptions = roomNumberInputElement.children;
  var guestOptions = guestNumberInputElement.children;
  var housingTypeElement = adFormElement.querySelector('#type');
  var priceInputElement = adFormElement.querySelector('#price');
  var timeInInputElement = adFormElement.querySelector('#timein');
  var timeOutInputElement = adFormElement.querySelector('#timeout');
  var timeFormElement = document.querySelector('.ad-form__element--time');
  var userPreviewElement = document.querySelector('.ad-form-header__preview img');
  var housePreviewElement = document.querySelector('.ad-form__photo');

  var removeSelectedElements = function (options) {
    for (var i = 0; i < options.length; i++) {
      options[i].removeAttribute('selected', 'selected');
    }
  };

  removeSelectedElements(roomOptions);
  removeSelectedElements(guestOptions);

  adFormAddressElement.value = window.map.MAIN_PIN_X_LOCATION + 'px' + ' ' + window.map.MAIN_PIN_Y_LOCATION + 'px';

  mapFiltersElement.classList.add('map__filters--disabled');

  var setDisabledElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  var removeDisabledElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled', 'disabled');
    }
  };

  setDisabledElements(formFieldsetsElement);
  setDisabledElements(formSelectsElement);
  setDisabledElements(guestOptions);
  guestOptions[2].setAttribute('selected', 'selected');
  guestOptions[2].removeAttribute('disabled', 'disabled');

  var roomGuestMatching = function () {
    setDisabledElements(guestOptions);
    guestOptions[2].removeAttribute('disabled', 'disabled');

    switch (roomNumberInputElement.value) {
      case '1':
        guestOptions[2].removeAttribute('disabled', 'disabled');
        break;
      case '2':
        guestOptions[2].removeAttribute('disabled', 'disabled');
        guestOptions[1].removeAttribute('disabled', 'disabled');
        break;
      case '3':
        guestOptions[2].removeAttribute('disabled', 'disabled');
        guestOptions[1].removeAttribute('disabled', 'disabled');
        guestOptions[0].removeAttribute('disabled', 'disabled');
        break;
      default:
        guestOptions[2].setAttribute('disabled', 'disabled');
        guestOptions[3].removeAttribute('disabled', 'disabled');
    }
  };

  roomNumberInputElement.addEventListener('change', roomGuestMatching);
  mapPinMainElement.addEventListener('click', roomGuestMatching);

  roomNumberInputElement.addEventListener('change', function () {
    if (roomNumberInputElement.value === '1' && guestNumberInputElement.value !== '1') {
      guestNumberInputElement.setCustomValidity('Только для 1 гостя');
    } else if (roomNumberInputElement.value === '2' && guestNumberInputElement.value !== '1' && guestNumberInputElement.value !== '2') {
      guestNumberInputElement.setCustomValidity('Только для 1 или 2 гостей');
    } else if (roomNumberInputElement.value === '3' && guestNumberInputElement.value === '0') {
      guestNumberInputElement.setCustomValidity('Только для 1,2 или 3 гостей');
    } else if (roomNumberInputElement.value === '100' && guestNumberInputElement.value !== '0') {
      guestNumberInputElement.setCustomValidity('Не для гостей');
    } else {
      guestNumberInputElement.setCustomValidity('');
    }
  });

  guestNumberInputElement.addEventListener('change', function () {
    if (roomNumberInputElement.value === '1' && guestNumberInputElement.value === '1') {
      guestNumberInputElement.setCustomValidity('');
    } else if (roomNumberInputElement.value === '2' && guestNumberInputElement.value !== '0' && guestNumberInputElement.value !== '3') {
      guestNumberInputElement.setCustomValidity('');
    } else if (roomNumberInputElement.value === '3' && guestNumberInputElement.value !== '0') {
      guestNumberInputElement.setCustomValidity('');
    } else if (roomNumberInputElement.value === '100' && guestNumberInputElement.value === '0') {
      guestNumberInputElement.setCustomValidity('');
    }
  });

  var housingTypeMatching = function () {
    var housingType = housingTypeElement.value;

    switch (housingType) {
      case 'flat':
        housingType = 'Квартира';
        priceInputElement.setAttribute('placeholder', MIN_FLAT_PRICE);
        priceInputElement.min = MIN_FLAT_PRICE;
        break;
      case 'bungalo':
        housingType = 'Бунгало';
        priceInputElement.setAttribute('placeholder', MIN_BUNGALO_PRICE);
        priceInputElement.min = MIN_BUNGALO_PRICE;
        break;
      case 'house':
        housingType = 'Дом';
        priceInputElement.setAttribute('placeholder', MIN_HOUSE_PRICE);
        priceInputElement.min = MIN_HOUSE_PRICE;
        break;
      case 'palace':
        housingType = 'Дворец';
        priceInputElement.setAttribute('placeholder', MIN_PALACE_PRICE);
        priceInputElement.min = MIN_PALACE_PRICE;
        break;
    }
  };

  mapPinMainElement.addEventListener('click', housingTypeMatching);
  housingTypeElement.addEventListener('change', housingTypeMatching);

  var timeMatching = function (evt) {
    if (evt.target.value === '12:00') {
      timeOutInputElement.value = evt.target.value;
      timeInInputElement.value = evt.target.value;
    } else if (evt.target.value === '13:00') {
      timeOutInputElement.value = evt.target.value;
      timeInInputElement.value = evt.target.value;
    } else if (evt.target.value === '14:00') {
      timeOutInputElement.value = evt.target.value;
      timeInInputElement.value = evt.target.value;
    }
  };

  timeFormElement.addEventListener('change', timeMatching);

  var deactivateState = function () {
    window.map.mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    mapFiltersElement.classList.add('map__filters--disabled');
    adFormElement.reset();
    priceInputElement.setAttribute('placeholder', MIN_FLAT_PRICE);
    setDisabledElements(formFieldsetsElement);
    setDisabledElements(formSelectsElement);
    mapPinMainElement.removeAttribute('disabled', 'disabled');
    mapPinMainElement.style.top = MAIN_PIN_CENTER_LOCATION_Y + 'px';
    mapPinMainElement.style.left = MAIN_PIN_CENTER_LOCATION_X + 'px';
    var deletePinElement = document.querySelectorAll('.map__pin--side');
    adFormAddressElement.value = window.map.MAIN_PIN_X_LOCATION + 'px' + ' ' + window.map.MAIN_PIN_Y_LOCATION + 'px';
    userPreviewElement.src = 'img/muffin-grey.svg';
    var cleanPhotoArray = Array.from(housePreviewElement.querySelectorAll('img'));

    var resetArray = function (array) {
      array.forEach(function (element) {
        element.remove();
      });
    };

    resetArray(cleanPhotoArray);
    resetArray(deletePinElement);

    var openedCard = document.querySelector('.map__card');

    if (openedCard) {
      openedCard.remove();
    }
  };

  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.loadData.save(new FormData(adFormElement), function () {
      deactivateState();
      var message = successMessage.cloneNode(true);
      main.insertBefore(message, main.firstChild);

      document.addEventListener('click', function () {
        message.remove();
      });

      document.addEventListener('keydown', function (evtBoard) {
        if (evtBoard.key === 'Escape') {
          message.remove();
        }
      });
    }, window.loadData.errorHandler);
  };

  adFormElement.addEventListener('submit', submitHandler);

  var cleanButton = adFormElement.querySelector('.ad-form__reset');

  cleanButton.addEventListener('click', function () {
    adFormElement.reset();
    deactivateState();
  });

  cleanButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      adFormElement.reset();
      deactivateState();
    }
  });

  window.form = {
    removeDisabledElements: removeDisabledElements
  };
})();
