'use strict';

(function () {
  var URLGET = 'https://javascript.pages.academy/keksobooking/data';
  var URL = 'https://javascript.pages.academy/keksobooking';

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URLGET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var errorHandler = function () {
    var main = document.querySelector('main');
    var error = document.querySelector('#error').content.querySelector('.error');
    main.insertBefore(error, main.firstChild);
    var closeErrorButton = error.querySelector('.error__button');

    closeErrorButton.addEventListener('click', function () {
      error.remove();
    });

    document.addEventListener('click', function () {
      error.remove();
    });

    document.addEventListener('keydown', function (evtBoard) {
      if (evtBoard.key === 'Escape') {
        error.remove();
      }
    });
  };

  window.loadData = {
    save: save,
    load: load,
    errorHandler: errorHandler
  };
})();
