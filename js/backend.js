'use strict';

(function () {
  var URLGET = 'https://javascript.pages.academy/keksobooking/data';
  var URL = 'https://javascript.pages.academy/keksobooking';

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
    var mainElement = document.querySelector('main');
    var errorElement = document.querySelector('#error').content.querySelector('.error');
    var errorClone = errorElement.cloneNode(true);
    mainElement.append(errorClone);

    var closeErrorButton = errorElement.querySelector('.error__button');

    closeErrorButton.addEventListener('click', function () {
      errorClone.remove();
    });

    document.addEventListener('click', function () {
      errorClone.remove();
    });

    document.addEventListener('keydown', function (evtBoard) {
      if (evtBoard.key === 'Escape') {
        errorClone.remove();
      }
    });
  };

  window.loadData = {
    save: save,
    load: load,
    errorHandler: errorHandler
  };
})();
