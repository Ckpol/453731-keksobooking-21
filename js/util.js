'use strict';

(function () {
  const pinsList = document.querySelector('.map__pins');

  window.util = {
    MAX_WIDTH_MAP: getComputedStyle(pinsList).width,

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
