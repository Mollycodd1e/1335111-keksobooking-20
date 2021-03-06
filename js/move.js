'use strict';

(function () {

  var movePin = function (evt) {

    var MAX_Y = 630;
    var MIN_Y = 130;

    var MAIN_PIN = {
      width: 62,
      height: 62,
      tail: 22
    };

    var mapPinMainElement = document.querySelector('.map__pin--main');
    var adFormElement = document.querySelector('.ad-form');
    var adFormAddressElement = adFormElement.querySelector('input[name="address"]');

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinCenter = MAIN_PIN.width / 2;
    var minCoordianteY = MIN_Y - MAIN_PIN.height - MAIN_PIN.tail;
    var maxCoordinateY = MAX_Y - MAIN_PIN.height - MAIN_PIN.tail;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var mapElement = document.querySelector('.map__pins');
      var mapWidth = mapElement.offsetWidth;
      var dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
      mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';

      if (dragged && (mapPinMainElement.offsetTop - shift.y) < (minCoordianteY)) {
        mapPinMainElement.style.top = minCoordianteY + 'px';
      }
      if (dragged && (mapPinMainElement.offsetTop - shift.y) > maxCoordinateY) {
        mapPinMainElement.style.top = maxCoordinateY + 'px';
      }
      if (dragged && (mapPinMainElement.offsetLeft - shift.x) < (-pinCenter)) {
        mapPinMainElement.style.left = (-pinCenter) + 'px';
      }
      if (dragged && (mapPinMainElement.offsetLeft - shift.x) > (mapWidth - pinCenter)) {
        mapPinMainElement.style.left = (mapWidth - pinCenter) + 'px';
      }

      var sharpLocY = (parseInt(mapPinMainElement.style.top, 10) + MAIN_PIN.height + MAIN_PIN.tail) + 'px';
      var sharpLocX = (parseInt(mapPinMainElement.style.left, 10) + pinCenter) + 'px';

      adFormAddressElement.value = (sharpLocX) + ' ' +
      (sharpLocY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var sharpLocY = (parseInt(mapPinMainElement.style.top, 10) + MAIN_PIN.height + MAIN_PIN.tail) + 'px';
      var sharpLocX = (parseInt(mapPinMainElement.style.left, 10) + pinCenter) + 'px';

      adFormAddressElement.value = (sharpLocX) + ' ' +
      (sharpLocY);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.move = {
    movePin: movePin
  };
})();
