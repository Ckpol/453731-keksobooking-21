'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    window.util.createResponse(onSuccess, onError, xhr);
    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
