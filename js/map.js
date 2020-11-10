'use strict';

(function () {
  const map = document.querySelector('.map');
  const pinsList = document.querySelector('.map__pins');
  const filtersContainer = map.querySelector('.map__filters-container');

  function onCardEscPress(evt) {
    window.util.isEscEvent(evt, closeCard);
  }

  function onPopupCloseClick(evt) {
    window.util.isPopupCloseClickEvent(evt, closeCard);
  }

  function renderCard(myElem, place) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.createPinCard(myElem));
    place.before(fragment);
    document.addEventListener('keydown', onCardEscPress);
    const mapCard = map.querySelector('.map__card');
    mapCard.addEventListener('click', onPopupCloseClick);
  }

  function closeCard() {
    const mapCard = map.querySelector('.map__card');
    const pins = pinsList.querySelectorAll('.map__pin');

    if (mapCard) {
      mapCard.remove();
      Array.from(pins).find((item) => {
        if (item.classList.contains('map__pin--active')) {
          item.classList.remove('map__pin--active');
        }
      });
      mapCard.removeEventListener('click', onPopupCloseClick);
    }
    document.removeEventListener('keydown', onCardEscPress);
  }

  function clearMap(myMap) {
    const items = myMap.querySelectorAll('button');
    closeCard();
    Array.from(items).map((item, index) => {
      if (index >= 1) {
        item.remove();
      }
    });
  }

  function onPinClick(evt) {

    const isImage = evt.target.matches('img');
    const isParentMainElem = evt.target.parentNode.classList.contains('map__pin--main');
    const isParentElem = evt.target.parentNode.classList.contains('map__pin');
    const isButtonElem = evt.target.matches('button[class="map__pin"]');

    if (isImage && isParentMainElem) {
      evt.preventDefault();
    } else if (isImage && isParentElem || isButtonElem) {
      const pins = pinsList.querySelectorAll('.map__pin');

      Array.from(pins).map((item) => {
        if (item.classList.contains('map__pin--active')) {
          item.classList.remove('map__pin--active');
        }
      });
      closeCard();

      const ind = Array.from(pins).findIndex((item) => {
        if (evt.target === item || evt.target.parentNode === item) {
          item.classList.add('map__pin--active');
          return true;
        } else {
          return false;
        }
      });
      renderCard(window.main.currentPins[ind - 1], filtersContainer);
    }
  }

  function onPinEnterPress(evt) {

    if (evt.target.matches('button[class="map__pin"]')) {

      if (evt.key === 'Enter') {
        const pins = pinsList.querySelectorAll('.map__pin');

        closeCard();
        const ind = Array.from(pins).findIndex((item) => evt.target === item);
        renderCard(window.main.currentPins[ind - 1], filtersContainer);
      } else if (evt.key === ' ') {
        evt.preventDefault();
      }
    }
  }

  window.map = {
    pinsList,
    clearMap,
    onPinClick,
    onPinEnterPress
  };
})();
