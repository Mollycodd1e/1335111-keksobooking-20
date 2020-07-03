'use strict';

(function () {
  var URLGET = 'https://javascript.pages.academy/keksobooking/data';
  var URL = 'https://javascript.pages.academy/keksobooking1';

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', URLGET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);

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
