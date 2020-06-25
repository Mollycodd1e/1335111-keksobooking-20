'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  //  var IMAGES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  // 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  //  var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  //  var CHECK_IN = ['12:00', '13:00', '14:00'];
  //  var CHECK_OUT = ['12:00', '13:00', '14:00'];
  var OBJECT_COUNT = 8;
  //  var NUMBERS_OF_ROOM_MIN = 1;
  //  var NUMBERS_OF_ROOM_MAX = 3;
  //  var NUMBERS_OF_GUESTS_MAX = 2;
  //  var NUMBERS_OF_GUESTS_MIN = 0;
  //  var PRICE_MIN = 1000;
  //  var PRICE_MAX = 100000;
  //  var MIN_X_LOCATION = 0;
  //var MIN_Y_LOCATION = 130;
  //  var MAX_X_LOCATION = 1200;
  //  var MAX_Y_LOCATION = 630;
  var OFFSET_X = 25;
  var OFFSET_Y = 70;

  /*var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };*/

  /*var getRandomArrayIndex = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
  };*/

  /*var getRandomFeatures = function (array) {
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
  };*/

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
      }
      else {
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

  var advertsArray = [];

  var createAdverts = function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);

      var locX = data[i].location.x;
      var locY = data[i].location.y;

      advertsArray.push({
        author: {
          avatar: data[i].author.avatar
        },
        offer: {
          title: data[i].offer.title,
          address: (data[i].location.x + OFFSET_X) + ',' + (data[i].location.y + OFFSET_Y),
          price: data[i].offer.price,
          type: data[i].offer.type,
          rooms: data[i].offer.rooms,
          guests: data[i].offer.guests,
          checkin: data[i].offer.checkin,
          checkout: data[i].offer.checkout,
          features: data[i].offer.features,
          description: data[i].offer.description,
          photos: data[i].offer.photos,
        },
        location: {
          x: locX,
          y: locY
        }
      });
    }
    return advertsArray;
  };

  console.log(advertsArray);

  window.loadData.load(createAdverts,window.loadData.showError);

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
