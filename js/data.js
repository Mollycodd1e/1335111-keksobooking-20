'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var IMAGES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var OBJECT_COUNT = 8;
var NUMBERS_OF_ROOM_MIN = 1;
var NUMBERS_OF_ROOM_MAX = 3;
var NUMBERS_OF_GUESTS_MAX = 2;
var NUMBERS_OF_GUESTS_MIN = 0;
var PRICE_MIN = 1000;
var PRICE_MAX = 100000;
var MIN_X_LOCATION = 0;
var MIN_Y_LOCATION = 130;
var MAX_X_LOCATION = 1200;
var MAX_Y_LOCATION = 630;
var OFFSET_X = 25;
var OFFSET_Y = 70;

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayIndex = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

var getRandomFeatures = function (array) {
  var randomFeatures = [];
  var randomLength = getRandomValue(1, FEATURES.length);

  for (var i = 0; i < randomLength; i++) {
    var random = Math.floor(Math.random() * array.length);
    var count = 0;

    for (var j = 0; j < i; j++) {
      if (randomFeatures[j] === array[random]) {
        count = +1;
      }
    }

    if (count < 1) {
      randomFeatures.push(array[random]);
    }
  }
  return randomFeatures;
};

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

  if (array.offer.rooms > 1) {
    wordRoom = 'комнаты';
  } else {
    wordRoom = 'комната';
  }

  return wordRoom;
};

var getWordGuest = function (array) {

  var wordGuest = '';

  if (array.offer.guests === 1) {
    wordGuest = 'гостя';
  } else {
    wordGuest = 'гостей';
  }

  return wordGuest;
};

var getFeatures = function (array, cardElement) {
  var features = array.offer.features;

  for (var i = 0; i < features.length; i++) {

    var randomFeature = '';

    for (var j = 0; j < FEATURES.length; j++) {

      if (features[i] === FEATURES[j]) {
        randomFeature = FEATURES[j];
      }
    }
    cardElement.querySelector('.popup__features').querySelector('.popup__feature--' + randomFeature).textContent = randomFeature;
  }
};

var addPhotoToCard = function (array, cardElement) {
  var photosArray = array.offer.photos;

  for (var i = 0; i < photosArray.length; i++) {
    if (i >= 1) {
      var addImage = '<img src=' + photosArray[i] + ' class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', addImage);
    } else {
      cardElement.querySelector('.popup__photos').querySelector('.popup__photo').src = photosArray[i];
    }
  }
};

var advertsArray = [];

var createAdverts = function (count) {
  for (var i = 0; i < count; i++) {

    var locX = getRandomValue(MIN_X_LOCATION, MAX_X_LOCATION);
    var locY = getRandomValue(MIN_Y_LOCATION, MAX_Y_LOCATION);

    advertsArray.push({
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      offer: {
        title: '',
        address: (locX + OFFSET_X) + ',' + (locY + OFFSET_Y),
        price: getRandomValue(PRICE_MIN, PRICE_MAX),
        type: getRandomArrayIndex(HOUSING_TYPE),
        rooms: getRandomValue(NUMBERS_OF_ROOM_MIN, NUMBERS_OF_ROOM_MAX),
        guests: getRandomValue(NUMBERS_OF_GUESTS_MIN, NUMBERS_OF_GUESTS_MAX),
        checkin: getRandomArrayIndex(CHECK_IN),
        checkout: getRandomArrayIndex(CHECK_OUT),
        features: getRandomFeatures(FEATURES),
        description: '',
        photos: getRandomFeatures(IMAGES),
      },
      location: {
        x: locX,
        y: locY
      }
    });
  }
  return advertsArray;
};
  createAdverts(OBJECT_COUNT);

  window.data = {
    createAdverts: createAdverts,
    OBJECT_COUNT: OBJECT_COUNT,
    FEATURES: FEATURES,
    advertsArray: advertsArray,
    getRoomType: getRoomType,
    getWordRoom: getWordRoom,
    getWordGuest: getWordGuest,
    getFeatures: getFeatures,
    addPhotoToCard: addPhotoToCard,
  };
})();
