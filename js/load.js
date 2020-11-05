'use strict';

(function () {
  const URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const response = [];
  const TIMEOUT_IN_MS = 10000;

  window.load = {
    errorHandler: function (errorMessage) {
      const node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },

    load: function (onSuccess, onError, saveData) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {

          try {
            onSuccess(xhr.response);
          } catch (err) {
            onError(`Error: ${err.message}`);
          }

          saveData(xhr.response, response);
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
    },

    ads: response
  };
})();

