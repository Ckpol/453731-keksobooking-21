'use strict';

(function () {
  const pinTemplateList = document.querySelector('#pin');
  const pinTemplateItem = pinTemplateList
  .content
  .querySelector('.map__pin');

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
    renderPins: function (myElems, place) {
      const fragment = document.createDocumentFragment();
      if (Array.isArray(myElems)) {
        for (let i = 0; i < myElems.length; i++) {
          fragment.appendChild(createPin(myElems[i]));
        }
        place.appendChild(fragment);
      }
    }
  };
})();
