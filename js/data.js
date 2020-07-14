'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

    if (array.offer.rooms > 1 && array.offer.rooms < 5) {
      wordRoom = 'комнаты';
    } else if (array.offer.rooms >= 5 || array.offer.rooms === 0) {
      wordRoom = 'комнат';
    } else {
      wordRoom = 'комната';
    }

    return wordRoom;
  };

  var getWordGuest = function (array) {

    var wordGuest = array.offer.guests === 1 ? 'гостя' : 'гостей';

    return wordGuest;
  };

  var addFeatures = function (array, cardElement) {
    var features = array.offer.features;

    for (var i = 0; i < features.length; i++) {
      cardElement.querySelector('.popup__features').querySelector('.popup__feature--' + features[i]).textContent = features[i];
    }
  };

  var addPhotoToCard = function (array, cardElement) {
    var photosArray = array.offer.photos;

    if (photosArray.length === 0) {
      cardElement.querySelector('.popup__photos').querySelector('.popup__photo').alt = 'Нет фото';
    }

    for (var i = 0; i < photosArray.length; i++) {
      if (i >= 1) {
        var addImage = '<img src=' + photosArray[i] + ' class="popup__photo" width="45" height="40" alt="Фотография жилья">';
        cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', addImage);
      } else {
        cardElement.querySelector('.popup__photos').querySelector('.popup__photo').src = photosArray[i];
      }
    }
  };

  window.data = {
    FEATURES: FEATURES,
    getRoomType: getRoomType,
    getWordRoom: getWordRoom,
    getWordGuest: getWordGuest,
    addFeatures: addFeatures,
    addPhotoToCard: addPhotoToCard,
  };
})();
