'use strict';

(function () {

  var movePin = function () {
    var mapPinMainElement = document.querySelector('.map__pin--main');
    var adFormElement = document.querySelector('.ad-form');
    var adFormAddressElement = adFormElement.querySelector('input[name="address"]');

    mapPinMainElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
        mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';

        if (dragged && mapPinMainElement.offsetTop < 99) {
          mapPinMainElement.style.top = 99 + 'px';
        }
        if (dragged && mapPinMainElement.offsetTop > 630) {
          mapPinMainElement.style.top = 630 + 'px';
        }
        if (dragged && mapPinMainElement.offsetLeft < -31) {
          mapPinMainElement.style.left = -31 + 'px';
        }
        if (dragged && mapPinMainElement.offsetLeft > 1169) {
          mapPinMainElement.style.left = 1169 + 'px';
        }

        var sharpLocY = (parseInt(mapPinMainElement.style.top, 10) + 53) + 'px';

        adFormAddressElement.value = (mapPinMainElement.style.left) + ' ' +
        (sharpLocY);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        var sharpLocY = (parseInt(mapPinMainElement.style.top, 10) + 53) + 'px';

        adFormAddressElement.value = (mapPinMainElement.style.left) + ' ' +
        (sharpLocY);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.move = {
    movePin: movePin
  };
})();
