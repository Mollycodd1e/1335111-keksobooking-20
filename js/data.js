'use strict';

(function () {
  var MAX_WORD_ROOMS_NUMBER = 5;
  var MIN_WORD_ROOMS_NUMBER = 1;
  var ZERO_WORD_ROOMS_NUMBER = 0;
  var WORD_GUEST_NUMBER = 1;

  var getRoomType = function (array) {

    var roomType = '';

    var type = array.offer.type;

    switch (type) {
      case 'flat':
        roomType = 'Квартира';
        break;
      case 'bungalo':
        roomType = 'Бунгало';
        break;
      case 'house':
        roomType = 'Дом';
        break;
      case 'palace':
        roomType = 'Дворец';
        break;
      default:
        roomType = 'Нет совпадений';
    }

    return roomType;
  };

  var getWordRoom = function (array) {

    var wordRoom = '';

    if (array.offer.rooms > MIN_WORD_ROOMS_NUMBER && array.offer.rooms < MAX_WORD_ROOMS_NUMBER) {
      wordRoom = 'комнаты';
    } else if (array.offer.rooms >= MAX_WORD_ROOMS_NUMBER || array.offer.rooms === ZERO_WORD_ROOMS_NUMBER) {
      wordRoom = 'комнат';
    } else {
      wordRoom = 'комната';
    }

    return wordRoom;
  };

  var getWordGuest = function (array) {

    var wordGuest = array.offer.guests === WORD_GUEST_NUMBER ? 'гостя' : 'гостей';

    return wordGuest;
  };

  var addFeatures = function (array, cardElement) {
    var features = array.offer.features;
    var featuresElement = cardElement.querySelector('.popup__features');

    features.forEach(function (element) {
      featuresElement.querySelector('.popup__feature--' + element).textContent = element;
    });
  };

  var addPhotoToCard = function (array, cardElement) {
    var photosArray = array.offer.photos;
    var photosElement = cardElement.querySelector('.popup__photos');
    var firstPhotoElement = photosElement.querySelector('.popup__photo');

    if (photosArray.length === 0) {
      firstPhotoElement.alt = 'Нет фото';
    }

    photosArray.forEach(function (element, i) {
      if (i >= 1) {
        var addImage = '<img src=' + element + ' class="popup__photo" width="45" height="40" alt="Фотография жилья">';
        photosElement.insertAdjacentHTML('beforeend', addImage);
      } else {
        firstPhotoElement.src = element;
      }
    });
  };

  window.data = {
    getRoomType: getRoomType,
    getWordRoom: getWordRoom,
    getWordGuest: getWordGuest,
    addFeatures: addFeatures,
    addPhotoToCard: addPhotoToCard,
  };
})();
