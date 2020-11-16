'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  window.load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    window.util.createResponse(onSuccess, onError, xhr);
    xhr.open(`GET`, URL);
    xhr.send();
  };
})();

