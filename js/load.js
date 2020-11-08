'use strict';

(function () {
  const URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const TIMEOUT_IN_MS = 10000;

  window.load = {

    load: function (onSuccess, onError) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {

          try {
            onSuccess(xhr.response);
          } catch (err) {
            onError(`Error: ${err.message}`);
          }
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

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();

