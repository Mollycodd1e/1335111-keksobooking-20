'use strict';

(function () {
  var MAIN_PIN_LOCATION_X = 570;
  var MAIN_PIN_LOCATION_Y = 375;
  var MAIN_PIN_X_LOCATION_CENTER = 601;
  var MAIN_PIN_Y_LOCATION_CENTER = 406;
  var MIN_FLAT_PRICE = 1000;
  var MIN_BUNGALO_PRICE = 0;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;

  var capacityValue = {
    none: 0,
    one: 1,
    two: 2,
    three: 3
  };

  var roomsValue = {
    one: 1,
    two: 2,
    three: 3,
    oneHundred: 100
  };

  var mapElement = document.querySelector('.map');
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
    var newArray = Array.from(options);

    newArray.forEach(function (element) {
      element.removeAttribute('selected', 'selected');
    });
  };

  removeSelectedElements(roomOptions);
  removeSelectedElements(guestOptions);

  adFormAddressElement.value = MAIN_PIN_X_LOCATION_CENTER + 'px' + ' ' + MAIN_PIN_Y_LOCATION_CENTER + 'px';

  mapFiltersElement.classList.add('map__filters--disabled');

  var setDisabledElements = function (elements) {
    var newArray = Array.from(elements);

    newArray.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };

  var removeDisabledElements = function (elements) {
    var newArray = Array.from(elements);

    newArray.forEach(function (element) {
      element.removeAttribute('disabled', 'disabled');
    });
  };

  setDisabledElements(formFieldsetsElement);
  setDisabledElements(formSelectsElement);
  setDisabledElements(guestOptions);
  guestOptions[2].setAttribute('selected', 'selected');
  guestOptions[2].removeAttribute('disabled', 'disabled');

  var onRoomNumberInputChange = function () {
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

  roomNumberInputElement.addEventListener('change', onRoomNumberInputChange);
  //mapPinMainElement.addEventListener('click', roomGuestMatching);

  var onRoomNumberInputSubmit = function () {
    if ((roomNumberInputElement.value === '' + roomsValue.one) && (guestNumberInputElement.value !== '' + capacityValue.one)) {
      guestNumberInputElement.setCustomValidity('Только для 1 гостя');
    } else if ((roomNumberInputElement.value === '' + roomsValue.two) &&
      (guestNumberInputElement.value !== '' + capacityValue.one) && (guestNumberInputElement.value !== '' + capacityValue.two)) {
      guestNumberInputElement.setCustomValidity('Только для 1 или 2 гостей');
    } else if ((roomNumberInputElement.value === '' + roomsValue.three) &&
      (guestNumberInputElement.value === '' + capacityValue.none)) {
      guestNumberInputElement.setCustomValidity('Только для 1,2 или 3 гостей');
    } else if ((roomNumberInputElement.value === '' + roomsValue.oneHundred) &&
      (guestNumberInputElement.value !== '' + capacityValue.none)) {
      guestNumberInputElement.setCustomValidity('Не для гостей');
    } else {
      guestNumberInputElement.setCustomValidity('');
    }
  };

  roomNumberInputElement.addEventListener('change',onRoomNumberInputSubmit);

  var onGuestNumberInputSubmit = function () {
    if ((roomNumberInputElement.value === '' + roomsValue.one) &&
      (guestNumberInputElement.value === '' + capacityValue.one)) {
      guestNumberInputElement.setCustomValidity('');
    } else if ((roomNumberInputElement.value === '' + roomsValue.two) &&
      (guestNumberInputElement.value !== '' + capacityValue.none) &&
      (guestNumberInputElement.value !== '' + capacityValue.three)) {
      guestNumberInputElement.setCustomValidity('');
    } else if ((roomNumberInputElement.value === '' + roomsValue.three) &&
      (guestNumberInputElement.value !== '' + capacityValue.none)) {
      guestNumberInputElement.setCustomValidity('');
    } else if ((roomNumberInputElement.value === '' + roomsValue.oneHundred) &&
      (guestNumberInputElement.value === '' + capacityValue.none)) {
      guestNumberInputElement.setCustomValidity('');
    }
  };

  guestNumberInputElement.addEventListener('change', onGuestNumberInputSubmit);

  priceInputElement.setAttribute('placeholder', MIN_FLAT_PRICE);
  
  var onHouseTypeChange = function () {
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

  //mapPinMainElement.addEventListener('click', housingTypeMatching);
  housingTypeElement.addEventListener('change', onHouseTypeChange);

  var onTimeInOutChange = function (evt) {
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

  timeFormElement.addEventListener('change', onTimeInOutChange);

  var deactivateState = function () {
    mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    mapFiltersElement.classList.add('map__filters--disabled');
    mapFiltersElement.reset();
    adFormElement.reset();
    priceInputElement.setAttribute('placeholder', MIN_FLAT_PRICE);
    setDisabledElements(formFieldsetsElement);
    setDisabledElements(formSelectsElement);
    mapPinMainElement.removeAttribute('disabled', 'disabled');
    mapPinMainElement.style.top = MAIN_PIN_LOCATION_Y + 'px';
    mapPinMainElement.style.left = MAIN_PIN_LOCATION_X + 'px';
    var deletePinElement = document.querySelectorAll('.map__pin--side');
    adFormAddressElement.value = MAIN_PIN_X_LOCATION_CENTER + 'px' + ' ' + MAIN_PIN_Y_LOCATION_CENTER + 'px';
    userPreviewElement.src = 'img/muffin-grey.svg';
    var cleanPhotoArray = Array.from(housePreviewElement.querySelectorAll('img'));

    var resetArray = function (array) {
      array.forEach(function (element) {
        element.remove();
      });
    };

    resetArray(cleanPhotoArray);
    resetArray(deletePinElement);

    var openedCardElement = document.querySelector('.map__card');

    if (openedCardElement) {
      openedCardElement.remove();
    }

    timeFormElement.removeEventListener('change', onTimeInOutChange);
    housingTypeElement.removeEventListener('change', onHouseTypeChange);
    guestNumberInputElement.removeEventListener('change', onGuestNumberInputSubmit);
    roomNumberInputElement.removeEventListener('change', onRoomNumberInputChange);
    roomNumberInputElement.removeEventListener('change',onRoomNumberInputSubmit);
    adFormElement.removeEventListener('submit', onFormSubmit);
  };

  var successMessageElement = document.querySelector('#success').content.querySelector('.success');
  var mainElement = document.querySelector('main');

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adFormElement), function () {
      deactivateState();
      var messageElement = successMessageElement.cloneNode(true);
      mainElement.insertBefore(messageElement, mainElement.firstChild);

      document.addEventListener('click', function () {
        messageElement.remove();
      });

      document.addEventListener('keydown', function (evtBoard) {
        if (evtBoard.key === 'Escape') {
          messageElement.remove();
        }
      });
    }, window.backend.onDataError);
  };

  adFormElement.addEventListener('submit', onFormSubmit);

  var cleanButtonElement = adFormElement.querySelector('.ad-form__reset');

  var onCleanButtonClick = function () {
    adFormElement.reset();
    deactivateState();
  };

  cleanButtonElement.addEventListener('click', onCleanButtonClick);

  var onCleanButtonPressEnter = function (evt) {
    if (evt.key === 'Enter') {
      adFormElement.reset();
      deactivateState();
    }
  };

  cleanButtonElement.addEventListener('keydown', onCleanButtonPressEnter);

  window.form = {
    removeDisabledElements: removeDisabledElements
  };
})();
