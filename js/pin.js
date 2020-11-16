'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const pinTemplateList = document.querySelector(`#pin`);
  const pinTemplateItem = pinTemplateList
  .content
  .querySelector(`.map__pin`);
  const pinsList = document.querySelector(`.map__pins`);

  const createPin = (ad) => {
    const pinElement = pinTemplateItem.cloneNode(true);
    const pinImg = pinElement.querySelector(`img`);
    pinElement.style.left = `${+ad.location[`x`] - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${+ad.location[`y`] - PIN_HEIGHT}px`;
    pinImg.src = `${ad.author.avatar}`;
    pinImg.alt = `${ad.offer.title}`;
    return pinElement;
  };

  const renderPins = (myElems) => {
    const fragment = document.createDocumentFragment();
    const pinsNumber = Math.min(myElems.length, window.util.PINS_NUMBER);

    if (Array.isArray(myElems)) {

      for (let i = 0; i < pinsNumber; i++) {
        if (!myElems[i] || !myElems[i].offer) {
          continue;
        }
        fragment.appendChild(createPin(myElems[i]));
      }
      pinsList.appendChild(fragment);
      window.main.currentPins = myElems;
    }
  };

  window.pin = {
    render: renderPins
  };

})();
