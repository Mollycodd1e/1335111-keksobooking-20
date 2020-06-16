'use strict';

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
var MAIN_PIN_X_LOCATION = 601;
var MAIN_PIN_Y_LOCATION = 406;
var MAIN_PIN_Y_OFFSET = 53;

var mapElement = document.querySelector('.map');

var mapListElement = mapElement.querySelector('.map__pins');
var pinElement = document.querySelector('#pin').content.querySelector('.map__pin');

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

var createPinElement = function (array) {
  var objectElement = pinElement.cloneNode(true);
  objectElement.style.left = array.location.x + 'px';
  objectElement.style.top = array.location.y + 'px';
  objectElement.querySelector('img').src = array.author.avatar;
  objectElement.querySelector('img').alt = array.offer.title;

  return objectElement;
};

var renderAdverts = function (count) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    fragment.appendChild(createPinElement(advertsArray[i])).classList.add('map__pin--side');

  }
  mapListElement.appendChild(fragment);
};

var cardElement = document.querySelector('#card').content.querySelector('.popup');

var getAdvertCardPopup = function (card) {
  var advertsCard = cardElement.cloneNode(true);

  advertsCard.querySelector('.popup__avatar').src = card.author.avatar;
  advertsCard.querySelector('.popup__title').textContent = card.offer.title;
  advertsCard.querySelector('.popup__text--address').textContent = card.offer.address;
  advertsCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  advertsCard.querySelector('.popup__type').textContent = getRoomType(card);
  advertsCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + getWordRoom(card) + ' для' + ' ' +
  card.offer.guests + ' ' + getWordGuest(card);
  advertsCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  getFeatures(card, advertsCard);

  for (var i = 0; i < FEATURES.length; i++) {
    if (advertsCard.querySelector('.popup__features').querySelector('.popup__feature--' + FEATURES[i]).textContent === '') {
      advertsCard.querySelector('.popup__features').querySelector('.popup__feature--' + FEATURES[i]).style.display = 'none';
    }
  }

  advertsCard.querySelector('.popup__description').textContent = card.offer.description;

  addPhotoToCard(card, advertsCard);

  return advertsCard;
};

var renderCards = function (card) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getAdvertCardPopup(card));

  mapElement.insertBefore(fragment, mapElement.querySelector('.map__filters-container'));
};


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

var removeSelectedElements = function (options) {
  for (var i = 0; i < options.length; i++) {
    options[i].removeAttribute('selected', 'selected');
  }
};

removeSelectedElements(roomOptions);
removeSelectedElements(guestOptions);

adFormAddressElement.value = MAIN_PIN_X_LOCATION + 'px' + ' ' + MAIN_PIN_Y_LOCATION + 'px';

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

var activeState = function () {
  mapElement.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');
  mapFiltersElement.classList.remove('map__filters--disabled');
  adFormAddressElement.value = (MAIN_PIN_X_LOCATION + 'px') + ' ' +
  (MAIN_PIN_Y_LOCATION + MAIN_PIN_Y_OFFSET + 'px');
 
  renderAdverts(OBJECT_COUNT);
  removeDisabledElements(formFieldsetsElement);
  removeDisabledElements(formSelectsElement);

  var allPinElements = document.querySelectorAll('.map__pin--side');

  var showCardOnCLick = function (card, button) {
    button.addEventListener('click', function () {
      renderCards(card); 
    });
  }
 
  for (var i = 0; i < OBJECT_COUNT; i++) {
    showCardOnCLick(createAdverts(OBJECT_COUNT)[i], allPinElements[i]);
  }
};

mapPinMainElement.addEventListener('mousedown', function (mouseButton) {
  if (mouseButton.button === 0) {
    activeState();
  }
});

mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activeState();
  }
});

var roomGuestMatching = function () {
  setDisabledElements(guestOptions);
  guestOptions[2].setAttribute('selected', 'selected');

  if (roomNumberInputElement.value === '1') {
    guestOptions[2].removeAttribute('disabled', 'disabled');
  } else if (roomNumberInputElement.value === '2') {
    guestOptions[2].removeAttribute('disabled', 'disabled');
    guestOptions[1].removeAttribute('disabled', 'disabled');
  } else if (roomNumberInputElement.value === '3') {
    guestOptions[2].removeAttribute('disabled', 'disabled');
    guestOptions[1].removeAttribute('disabled', 'disabled');
    guestOptions[0].removeAttribute('disabled', 'disabled');
  } else {
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

var timeInMatching = function () {
  if (timeInInputElement.value === '12:00') {
    timeOutInputElement.value = timeInInputElement.value;
  } else if (timeInInputElement.value === '13:00') {
    timeOutInputElement.value = timeInInputElement.value;
  } else if (timeInInputElement.value === '14:00') {
    timeOutInputElement.value = timeInInputElement.value;
  }
};

var timeOutMatching = function () {
  if (timeOutInputElement.value === '12:00') {
    timeInInputElement.value = timeOutInputElement.value;
  } else if (timeOutInputElement.value === '13:00') {
    timeInInputElement.value = timeOutInputElement.value;
  } else if (timeOutInputElement.value === '14:00') {
    timeInInputElement.value = timeOutInputElement.value;
  }
};

timeInInputElement.addEventListener('change', timeInMatching);
timeOutInputElement.addEventListener('change', timeOutMatching);
