'use strict';

const loadURL = `https://21.javascript.pages.academy/keksobooking/data`;

window.load = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  window.util.createResponse(onSuccess, onError, xhr);
  xhr.open(`GET`, loadURL);
  xhr.send();
};


