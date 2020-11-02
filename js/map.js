'use strict';

(function () {
  const map = document.querySelector('.map');
  const pinsList = document.querySelector('.map__pins');
  const mainPin = pinsList.querySelector('.map__pin--main');
  const filtersContainer = map.querySelector('.map__filters-container');
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 70;

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
  function onMainPinClick(evt) {
    if (evt.button === 0) {
      window.main.changeToActive(
          map,
          window.form.formOffer,
          window.form.formOfferElements,
          window.form.filtersForm,
          window.form.filtersFormElements);
      window.form.setAddress(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
    }
    mainPin.removeEventListener('keydown', onMainPinEnter);
  }

  function onMainPinEnter(evt) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      window.main.changeToActive(
          map,
          window.form.formOffer,
          window.form.formOfferElements,
          window.form.filtersForm,
          window.form.filtersFormElements);
      window.form.setAddress(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
    }
    mainPin.removeEventListener('mousedown', onMainPinClick);
  }

  mainPin.addEventListener('mousedown', onMainPinClick, {once: true});
  mainPin.addEventListener('keydown', onMainPinEnter, {once: true});

  window.map = {
    pinsMap: map,
    pinsList: pinsList,
    mainPinButton: mainPin,
    MAIN_PIN_START_WIDTH: 65,
    MAIN_PIN_START_HEIGHT: 65,

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
