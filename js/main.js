'use strict';

var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var IMAGES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OBJECT_COUNT = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapList = map.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

var neighborMassive = [];

var createMassive = function (count) {
  for (var i = 1; i <= count; i++) {
    neighborMassive.push({
      author: {
        avatar: 'img/avatars/user' + '0' + [i] + '.png'
      },
      offer: {
        title: document.querySelector('#title').value,
        address: '{{location.x}}, {{location.y}}',
        price: document.querySelector('#price').value,
        type: document.querySelector('#type').value,
        rooms: document.querySelector('#room_number').value,
        guests: document.querySelector('#capacity').value,
        checkin: document.querySelector('#timein').value,
        checkout: document.querySelector('#timeout').value,
        features: getRandomFacilities(FACILITIES),
        description: document.querySelector('#description').textContent,
        photos: getRandomFacilities(IMAGES),
      },
      location: {
        x: getRandomValue(0, window.innerWidth),
        y: getRandomValue(130, 650)
      }
    });
  }
  return neighborMassive;
};

createMassive(OBJECT_COUNT);

var cloneObject = function (array) {
  var objectElement = pin.cloneNode(true);
  objectElement.style.left = array.location.x + 'px';
  objectElement.style.top = array.location.y + 'px';
  objectElement.querySelector('img').src = array.author.avatar;
  objectElement.querySelector('img').alt = array.offer.title;

  return objectElement;
};

var renderObject = function (count) {
  var fragment = document.createDocumentFragment();
  for (var l = 0; l < count; l++) {
    fragment.appendChild(cloneObject(neighborMassive[l]));
  }
  mapList.appendChild(fragment);
};

renderObject(OBJECT_COUNT);
