'use strict';

(function () {
  const pinTemplateList = document.querySelector('#pin');
  const pinTemplateItem = pinTemplateList
  .content
  .querySelector('.map__pin');
  const pinsList = document.querySelector('.map__pins');

  function createPin(ad) {
    const pinElement = pinTemplateItem.cloneNode(true);
    const pinImg = pinElement.querySelector('img');
    pinElement.style.left = `${+ad.location['x'] - 25}px`;
    pinElement.style.top = `${+ad.location['y'] - 70}px`;
    pinImg.src = `${ad.author.avatar}`;
    pinImg.alt = `${ad.offer.title}`;
    return pinElement;
  }

  window.pin = {

    renderPins: function (myElems) {
      const fragment = document.createDocumentFragment();
      if (Array.isArray(myElems)) {

        if (myElems.length === 0) {
          throw new Error('Массив данных пуст');
        }

        for (let i = 0; i < window.util.PINS_NUMBER; i++) {
          if (!myElems[i] || !myElems[i].offer) {
            continue;
          }
          fragment.appendChild(createPin(myElems[i]));
        }
        pinsList.appendChild(fragment);
        window.main.currentPins = myElems;
      }
    }
  };

})();
