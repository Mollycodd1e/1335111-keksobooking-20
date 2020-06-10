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

var getRoomType = function (array) {

  var roomType = '';

  var compare = array.offer.type;

  switch (compare) {
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

var fillFeatures = function (array) {
  var featuresArray = array.offer.features;
  var addFeaturesToHtml = [];

  for (var j = 0; j < featuresArray.length; j++) {

    var randomFeature = '';

    for (var k = 0; k < FACILITIES.length; k++) {

      if (featuresArray[j] === FACILITIES[k]) {
        randomFeature = FACILITIES[k];
      }
    }
    addFeaturesToHtml.push(randomFeature);
  }
  return addFeaturesToHtml;
};

var advertsArray = [];

var createAdverts = function (count) {
  for (var i = 1; i <= count; i++) {
    var locX = getRandomValue(0, 1200);
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

var card = document.querySelector('#card').content.querySelector('.popup');

var cloneCard = function (array) {
  var advertsCard = card.cloneNode(true);

  advertsCard.querySelector('.popup__avatar').src = array[0].author.avatar;
  advertsCard.querySelector('.popup__title').textContent = array[0].offer.title;
  advertsCard.querySelector('.popup__text--address').textContent = array[0].offer.address;
  advertsCard.querySelector('.popup__text--price').textContent = array[0].offer.price + '₽/ночь';
  advertsCard.querySelector('.popup__type').textContent = getRoomType(array[0]);
  advertsCard.querySelector('.popup__text--capacity').textContent = array[0].offer.rooms + ' ' + getWordRoom(array[0]) + ' для' + ' ' +
  array[0].offer.guests + ' ' + getWordGuest(array[0]);
  advertsCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + array[0].offer.checkin + ', выезд до ' + array[0].offer.checkout;

  for (var j = 0; j < fillFeatures(array[0]).length; j++) {
    advertsCard.querySelector('.popup__features').querySelector('.popup__feature--' + fillFeatures(array[0])[j]).textContent = fillFeatures(array[0])[j];
  }

  for (var i = 0; i < FACILITIES.length; i++) {
    if (advertsCard.querySelector('.popup__features').querySelector('.popup__feature--' + FACILITIES[i]).textContent === '') {
      advertsCard.querySelector('.popup__features').querySelector('.popup__feature--' + FACILITIES[i]).style.display = 'none';
    }
  }

  advertsCard.querySelector('.popup__description').textContent = array[0].offer.description;

  var photosArray = array[0].offer.photos;

  for (var l = 0; l < photosArray.length; l++) {
    if (l >= 1) {
      var addImage = '<img src=' + photosArray[l] + ' class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      advertsCard.querySelector('.popup__photos').insertAdjacentHTML('beforeend', addImage);
    } else {
      advertsCard.querySelector('.popup__photos').querySelector('.popup__photo').src = photosArray[l];
    }
  }
  return advertsCard;
};

var renderCards = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 1; i++) {
    fragment.appendChild(cloneCard(array));
  }
  map.insertBefore(fragment, map.querySelector('.map__filters-container'));
};

renderCards(createAdverts(OBJECT_COUNT));
