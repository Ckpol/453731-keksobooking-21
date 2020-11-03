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

    if (mapCard) {
      mapCard.remove();
      mapCard.removeEventListener('click', onPopupCloseClick);
    }
    document.removeEventListener('keydown', onCardEscPress);
  }

  window.map = {
    pinsList: pinsList,

    onPinClick: function (evt, ads) {
      const isImage = evt.target.matches('img');
      const isParentMainElem = evt.target.parentNode.classList.contains('map__pin--main');
      const isParentElem = evt.target.parentNode.classList.contains('map__pin');
      const isButtonElem = evt.target.matches('button[class="map__pin"]');

      if (isImage && isParentMainElem) {
        evt.preventDefault();
      } else if (isImage && isParentElem || isButtonElem) {
        const pins = pinsList.querySelectorAll('.map__pin');
        closeCard();

        const ind = Array.from(pins).findIndex((item) => (evt.target === item || evt.target.parentNode === item));
        renderCard(ads[ind - 1], filtersContainer);
      }
    },

    onPinEnterPress: function (evt, ads) {
      if (evt.target.matches('button[class="map__pin"]')) {

        if (evt.key === 'Enter') {
          const pins = pinsList.querySelectorAll('.map__pin');
          closeCard();
          const ind = Array.from(pins).findIndex((item) => evt.target === item);
          renderCard(ads[ind - 1], filtersContainer);
        } else if (evt.key === ' ') {
          evt.preventDefault();
        }
      }
    }
  };
})();
