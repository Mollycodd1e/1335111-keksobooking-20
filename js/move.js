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

      var MAX_Y = 630;
      var MIN_Y = 130;
      var SHARP_END = 22;
      var pinCenter = 62 / 2; //width = border + padding + img.width;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        
        var map = document.querySelector('.map__pins');
        var mapWidth = map.offsetWidth; 
        
        var dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        
        startCoords.x = moveEvt.clientX;
        startCoords.y = moveEvt.clientY;

        console.log(startCoords.y);
        console.log(moveEvt.clientY)
        console.log(mapPinMainElement.offsetTop)
        mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
        mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';

        if (dragged && mapPinMainElement.offsetTop < (MIN_Y - pinCenter)) {
          mapPinMainElement.style.top = MIN_Y - pinCenter + 'px';
        }
        if (dragged && mapPinMainElement.offsetTop > MAX_Y) {
          mapPinMainElement.style.top = MAX_Y + 'px';
        }
        if (dragged && mapPinMainElement.offsetLeft < (-pinCenter)) {
          mapPinMainElement.style.left = (-pinCenter) + 'px';
        }
        if (dragged && mapPinMainElement.offsetLeft > (mapWidth - pinCenter)) {
          mapPinMainElement.style.left = (mapWidth - pinCenter) + 'px';
        }

        var sharpLocY = (parseInt(mapPinMainElement.style.top, 10) + pinCenter + SHARP_END) + 'px';

        adFormAddressElement.value = (mapPinMainElement.style.left) + ' ' +
        (sharpLocY);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        var sharpLocY = (parseInt(mapPinMainElement.style.top, 10) + pinCenter + SHARP_END) + 'px';

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
