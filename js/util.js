'use strict';

(function () {
  const pinsList = document.querySelector('.map__pins');

  window.util = {
    MAX_WIDTH_MAP: getComputedStyle(pinsList).width,
    MAIN_PIN_START_WIDTH: 65,
    MAIN_PIN_START_HEIGHT: 65,
    MAIN_PIN_START_TOP_COORD: '375px',
    MAIN_PIN_START_LEFT_COORD: '570px',
    PINS_NUMBER: 5,
    DEBOUNCE_INTERVAL: 500,

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

    getRandomArray: function (min, max, n) {
      const collection = new Set();
      while (collection.size < n) {
        collection.add('0' + Math.floor(min + Math.random() * (max)));
      }
      return Array.from(collection);
    },

    getRandomItem: function (arr) {
      const result = Math.floor(Math.random() * arr.length);
      return arr[result];
    },

    getRandomItems: function (arr) {
      const result = [];
      const rolls = Math.floor(1 + Math.random() * arr.length);

      for (let i = 0; i < rolls; i++) {
        result.push(arr[i]);
      }
      return result;

    },

    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    },

    isPopupCloseClickEvent: function (evt, action) {
      if (evt.target.matches('button[class="popup__close"]')) {
        action();
      }
    }
  };
})();
