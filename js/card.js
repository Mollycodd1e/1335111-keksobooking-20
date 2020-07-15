'use strict';

(function () {
  var cardElement = document.querySelector('#card').content.querySelector('.popup');

  var getAdvertCardPopup = function (card) {
    var advertsCardElement = cardElement.cloneNode(true);

    advertsCardElement.querySelector('.popup__avatar').src = card.author.avatar;
    advertsCardElement.querySelector('.popup__title').textContent = card.offer.title;
    advertsCardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    advertsCardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    advertsCardElement.querySelector('.popup__type').textContent = window.data.getRoomType(card);
    advertsCardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + window.data.getWordRoom(card) + ' для' + ' ' +
    card.offer.guests + ' ' + window.data.getWordGuest(card);
    advertsCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    window.data.addFeatures(card, advertsCardElement);

    window.data.featuresList.forEach(function (element) {
      if (advertsCardElement.querySelector('.popup__features').querySelector('.popup__feature--' + element).textContent === '') {
        advertsCardElement.querySelector('.popup__features').querySelector('.popup__feature--' + element).style.display = 'none';
      }
    });

    advertsCardElement.querySelector('.popup__description').textContent = card.offer.description;

    window.data.addPhotoToCard(card, advertsCardElement);

    return advertsCardElement;
  };

  var renderCards = function (card) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getAdvertCardPopup(card));

    window.map.mapElement.insertBefore(fragment, window.map.mapElement.querySelector('.map__filters-container'));
  };

  window.card = {
    renderCards: renderCards,
    cardElement: cardElement
  };
})();
