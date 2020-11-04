'use strict';

(function () {
  const URL = 'https://21.javascript.pages.academy/keksobooking';
  const TIMEOUT_IN_MS = 10000;

  window.upload = {
    upload: function (data, onSuccess, onError) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError();
        }

        xhr.addEventListener('error', function () {
          onError();
        });

        xhr.addEventListener('timeout', function () {
          onError();
        });

        xhr.timeout = TIMEOUT_IN_MS;
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
