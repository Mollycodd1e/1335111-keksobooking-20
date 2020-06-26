'use strict';

(function () {
  var cardElement = document.querySelector('#card').content.querySelector('.popup');

  var getAdvertCardPopup = function (card) {
    var advertsCard = cardElement.cloneNode(true);

    advertsCard.querySelector('.popup__avatar').src = card.author.avatar;
    advertsCard.querySelector('.popup__title').textContent = card.offer.title;
    advertsCard.querySelector('.popup__text--address').textContent = card.offer.address;
    advertsCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    advertsCard.querySelector('.popup__type').textContent = window.data.getRoomType(card);
    advertsCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + window.data.getWordRoom(card) + ' для' + ' ' +
    card.offer.guests + ' ' + window.data.getWordGuest(card);
    advertsCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    window.data.getFeatures(card, advertsCard);

    for (var i = 0; i < card.offer.features.length; i++) {
      if (advertsCard.querySelector('.popup__features').querySelector('.popup__feature--' + window.data.FEATURES[i]).textContent === '') {
        advertsCard.querySelector('.popup__features').querySelector('.popup__feature--' + window.data.FEATURES[i]).style.display = 'none';
      }
    }

    advertsCard.querySelector('.popup__description').textContent = card.offer.description;

    window.data.addPhotoToCard(card, advertsCard);

    return advertsCard;
  };

  var renderCards = function (card) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getAdvertCardPopup(card));

    window.map.mapElement.insertBefore(fragment, window.map.mapElement.querySelector('.map__filters-container'));
  };

  window.card = {
    renderCards: renderCards,
  };
})();
