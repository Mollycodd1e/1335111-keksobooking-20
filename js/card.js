'use strict';

(function () {
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var popupElement = document.querySelector('#card').content.querySelector('.popup');
  
  var getAdvertCardPopup = function (card) {
    var advertsCardElement = popupElement.cloneNode(true);
    var featuresElement = advertsCardElement.querySelector('.popup__features');

    advertsCardElement.querySelector('.popup__avatar').src = card.author.avatar;
    advertsCardElement.querySelector('.popup__title').textContent = card.offer.title;
    advertsCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    advertsCardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    advertsCardElement.querySelector('.popup__type').textContent = window.data.getRoomType(card);
    advertsCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + window.data.getWordRoom(card) + ' для' + ' ' +
    card.offer.guests + ' ' + window.data.getWordGuest(card);
    advertsCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    window.data.addFeatures(card, advertsCardElement);

    featuresList.forEach(function (element) {
      if (featuresElement.querySelector('.popup__feature--' + element).textContent === '') {
        featuresElement.querySelector('.popup__feature--' + element).style.display = 'none';
      }
    });

    advertsCardElement.querySelector('.popup__description').textContent = card.offer.description;

    window.data.addPhotoToCard(card, advertsCardElement);

    return advertsCardElement;
  };

  var render = function (card) {
    var fragment = document.createDocumentFragment();
    var mapElement = document.querySelector('.map');

    fragment.appendChild(getAdvertCardPopup(card));

    mapElement.insertBefore(fragment, mapElement.querySelector('.map__filters-container'));
  };

  window.popup = {
    render: render
  };
})();
