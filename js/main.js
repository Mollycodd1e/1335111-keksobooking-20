'use strict';

var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var IMAGES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomFacilities = function (array) {
  var randomFacilities = [];

  for (var j = 1; j <= getRandom(1, FACILITIES.length); j++) {
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

var massive = [];

var createMassive = function (array) {
  var object = {};

  for (var i = 1; i <= 8; i++) {
    object[i] = {
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
        x: getRandom(0, window.innerWidth),
        y: getRandom(130, 650)
      }
    };

    array.push(object[i]);
  }
  return massive;
};

createMassive(massive);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapList = map.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

var renderObject = function (array) {
  for (var a = 0; a < massive.length; a++) {
    console.log(massive);
    var objectElement = pin.cloneNode(true);
    //objectElement.style = 'left: (location.x)px; top: (location.y)px;';
    objectElement.src = array[a].avatar;
    objectElement.alt = array[a].title;

    console.log(objectElement)
  }
  return objectElement;
};

renderObject(massive);

var fragment = document.createDocumentFragment();
for (var l = 0; l < massive; l++) {
  fragment.appendChild(renderObject(massive[l]));
}

mapList.appendChild(fragment);
