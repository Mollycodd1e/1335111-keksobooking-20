'use strict';

var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapList = map.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayIndex = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

var getRandomFacilities = function (array) {
  var randomFacilities = [];

  for (var j = 1; j <= getRandomValue(1, FACILITIES.length); j++) {
    var random = Math.floor(Math.random() * array.length);
    var count = 0;

    for (var k = 0; k < j; k++) {
      if (randomFacilities[k] === array[random]) {
        count = +1;
      }
    }

    if (count < 1) {
      randomFacilities.push(array[random]);
    }
  }
  return randomFacilities;
};

var advertsArray = [];

var createAdverts = function (count) {
  for (var i = 1; i <= count; i++) {
    var locX = getRandomValue(0, window.innerWidth);
    var locY = getRandomValue(130, 650);

    advertsArray.push({
      author: {
        avatar: 'img/avatars/user' + '0' + [i] + '.png'
      },
      offer: {
        title: '',
        address: (locX + 25) + ',' + (locY + 70),
        price: getRandomValue(PRICE_MIN, PRICE_MAX),
        type: getRandomArrayIndex(HOUSING_TYPE),
        rooms: getRandomValue(NUMBERS_OF_ROOM_MIN, NUMBERS_OF_ROOM_MAX),
        guests: getRandomValue(NUMBERS_OF_GUESTS_MIN, NUMBERS_OF_GUESTS_MAX),
        checkin: getRandomArrayIndex(CHECK_IN),
        checkout: getRandomArrayIndex(CHECK_OUT),
        features: getRandomFacilities(FACILITIES),
        description: '',
        photos: getRandomFacilities(IMAGES),
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

var cloneObject = function (array) {
  var objectElement = pin.cloneNode(true);
  objectElement.style.left = array.location.x + 'px';
  objectElement.style.top = array.location.y + 'px';
  objectElement.querySelector('img').src = array.author.avatar;
  objectElement.querySelector('img').alt = array.offer.title;

  return objectElement;
};

var renderAdverts = function (count) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    fragment.appendChild(cloneObject(advertsArray[i]));
  }
  mapList.appendChild(fragment);
};

renderAdverts(OBJECT_COUNT);
