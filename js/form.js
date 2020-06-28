'use strict';

(function () {

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
        priceInputElement.setAttribute('placeholder', '1000');
        priceInputElement.min = '1000';
        break;
      case 'bungalo':
        housingType = 'Бунгало';
        priceInputElement.setAttribute('placeholder', '0');
        priceInputElement.min = '0';
        break;
      case 'house':
        housingType = 'Дом';
        priceInputElement.setAttribute('placeholder', '5000');
        priceInputElement.min = '5000';
        break;
      case 'palace':
        housingType = 'Дворец';
        priceInputElement.setAttribute('placeholder', '10000');
        priceInputElement.min = '10000';
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
    priceInputElement.setAttribute('placeholder', '1000');
    setDisabledElements(formFieldsetsElement);
    setDisabledElements(formSelectsElement);
    mapPinMainElement.removeAttribute('disabled', 'disabled');
    var deletePinElement = document.querySelectorAll('.map__pin--side');

    for (var i = 0; i < deletePinElement.length; i++) {
      deletePinElement[i].remove();
    }

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
  });

  window.form = {
    removeDisabledElements: removeDisabledElements,
  };
})();
