'use strict';

(function () {
  let pins = [];
  let currentPins = [];

  const successHandler = (data) => {
    pins = data;
    if (data.length > 0) {
      window.form.filters.classList.remove(`map__filters--disabled`);
      Array.from(window.form.filtersElements)
      .map((item) => {
        item.removeAttribute(`disabled`);
      });
    }
    window.pin.render(pins);
  };

  const makePageInactive = (myMap, offerForm, offerFormElems, filterForm, filterFormElems) => {

    if (!myMap.classList.contains(`map--faded`)) {
      myMap.classList.add(`map--faded`);
    }

    if (!offerForm.classList.contains(`ad-form--disabled`)) {
      offerForm.classList.add(`ad-form--disabled`);
    }

    if (!filterForm.classList.contains(`map__filters--disabled`)) {
      filterForm.classList.add(`map__filters--disabled`);
    }
    window.form.clear(offerForm);
    Array.from(offerFormElems)
    .map((item) => {
      item.setAttribute(`disabled`, `disabled`);
    });

    window.form.clear(filterForm);
    Array.from(filterFormElems)
    .map((item) => {
      item.setAttribute(`disabled`, `disabled`);
    });

    window.map.clear(window.move.pinsList);
    window.move.mainPin.style.top = window.util.MAIN_PIN_START_TOP_COORD;
    window.move.mainPin.style.left = window.util.MAIN_PIN_START_LEFT_COORD;

    window.form.setAddress(
        window.move.mainPin,
        window.util.MAIN_PIN_START_WIDTH,
        window.util.MAIN_PIN_START_HEIGHT
    );
  };

  const makePageActive = (myMap, offerForm, offerFormElems) => {
    myMap.classList.remove(`map--faded`);
    offerForm.classList.remove(`ad-form--disabled`);

    Array.from(offerFormElems)
    .map((item) => {
      item.removeAttribute(`disabled`);
    });

    window.load(successHandler, window.util.errorHandler);
  };

  makePageInactive(
      window.move.map,
      window.form.offer,
      window.form.offerElements,
      window.form.filters,
      window.form.filtersElements);
  window.form.setAddress(
      window.move.mainPin,
      window.util.MAIN_PIN_START_WIDTH,
      window.util.MAIN_PIN_START_HEIGHT
  );

  window.move.mainPin.addEventListener(`mousedown`, window.move.onMainPinClick);
  window.move.mainPin.addEventListener(`keydown`, window.move.onMainPinEnter);

  window.map.pinsList.addEventListener(`click`, (evt) => {
    window.map.onPinClick(evt);
  });

  window.map.pinsList.addEventListener(`keydown`, (evt) => {
    window.map.onPinEnterPress(evt);
  });

  window.form.offer.addEventListener(`submit`, (evt) => {
    window.upload(
        new FormData(window.form.offer),
        () => {
          makePageInactive(
              window.move.map,
              window.form.offer,
              window.form.offerElements,
              window.form.filters,
              window.form.filtersElements
          );
          window.uploadMessages.showSuccess();
        },
        window.uploadMessages.showError
    );

    evt.preventDefault();
  });

  window.form.offerResetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    makePageInactive(
        window.move.map,
        window.form.offer,
        window.form.offerElements,
        window.form.filters,
        window.form.filtersElements);
  });

  window.form.filterFeatures.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      evt.target.checked = (evt.target.checked) ? false : true;

      window.pinsFilter.saveData();
      window.pinsFilter.updateWithDebounce(pins);
    }
  });

  window.form.filters.addEventListener(`change`, () => {
    window.pinsFilter.saveData();
    window.pinsFilter.updateWithDebounce(pins);
  });

  window.main = {
    changeToInactive: makePageInactive,
    changeToActive: makePageActive,
    pins,
    currentPins
  };
})();
