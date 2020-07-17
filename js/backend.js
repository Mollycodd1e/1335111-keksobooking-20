'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var URLGET = 'https://javascript.pages.academy/keksobooking/data';
  var URL = 'https://javascript.pages.academy/keksobooking';

  var StatusCode = {
    OK: 200
  };

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

  var onDataError = function () {
    var mainElement = document.querySelector('main');
    var errorElement = document.querySelector('#error').content.querySelector('.error');
    var errorClone = errorElement.cloneNode(true);
    mainElement.append(errorClone);

    var closeErrorButtonElement = errorElement.querySelector('.error__button');

    var onCloseErrorButtonClick = function () {
      errorClone.remove();
    };

    var onScreenClick = function () {
      errorClone.remove();
    };

    var onScreenPressEsc = function (evtBoard) {
      if (evtBoard.key === 'Escape') {
        errorClone.remove();
      }
    };

    closeErrorButtonElement.addEventListener('click', onCloseErrorButtonClick);

    document.addEventListener('click', onScreenClick);

    document.addEventListener('keydown', onScreenPressEsc); 
  };

  window.backend = {
    save: save,
    load: load,
    onDataError: onDataError
  };
})();
