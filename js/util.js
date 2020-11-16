'use strict';

(function () {
  const pinsList = document.querySelector(`.map__pins`);
  const defaultImage = `img/muffin-grey.svg`;
  const maxWidthMap = getComputedStyle(pinsList).width;
  const MAIN_PIN_START_WIDTH = 65;
  const MAIN_PIN_START_HEIGHT = 65;
  const MAIN_PIN_START_TOP_COORD = `375px`;
  const MAIN_PIN_START_LEFT_COORD = `570px`;
  const PINS_NUMBER = 5;
  const DEBOUNCE_INTERVAL = 500;
  const PREVIEW_CONTAINER_WIDTH = 70;
  const PREVIEW_CONTAINER_HEIGHT = 70;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const isEscEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      action();
    }
  };

  const isPopupCloseClickEvent = (evt, action) => {
    if (evt.target.matches(`button[class="popup__close"]`)) {
      action();
    }
  };

  const createResponse = (onSuccess, onError, xhr) => {
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      if (xhr.status === window.util.StatusCode.OK) {

        try {
          onSuccess(xhr.response);
        } catch (err) {
          onError(`Error: ${err.message}`);
        }
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
    xhr.timeout = TIMEOUT_IN_MS;
  };

  window.util = {
    MAIN_PIN_START_WIDTH,
    MAIN_PIN_START_HEIGHT,
    MAIN_PIN_START_TOP_COORD,
    MAIN_PIN_START_LEFT_COORD,
    PINS_NUMBER,
    DEBOUNCE_INTERVAL,
    PREVIEW_CONTAINER_WIDTH,
    PREVIEW_CONTAINER_HEIGHT,
    FILE_TYPES,
    defaultImage,
    maxWidthMap,
    errorHandler,
    isEscEvent,
    isPopupCloseClickEvent,
    StatusCode,
    createResponse
  };
})();
