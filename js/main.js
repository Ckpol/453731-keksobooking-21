'use strict';

(function () {
  let pins = [];
  let currentPins = [];

  function successHandler(data) {
    pins = data;
    if (data.length > 0) {
      window.form.filtersForm.classList.remove('map__filters--disabled');
      Array.from(window.form.filtersFormElements)
      .map((item) => {
        item.removeAttribute('disabled');
      });
    }
    window.pin.renderPins(pins);
  }

  function makePageInactive(myMap, offerForm, offerFormElems, filterForm, filterFormElems) {

    if (!myMap.classList.contains('map--faded')) {
      myMap.classList.add('map--faded');
    }

    if (!offerForm.classList.contains('ad-form--disabled')) {
      offerForm.classList.add('ad-form--disabled');
    }

    if (!filterForm.classList.contains('map__filters--disabled')) {
      filterForm.classList.add('map__filters--disabled');
    }
    window.form.clearForm(offerForm);
    Array.from(offerFormElems)
    .map((item) => {
      item.setAttribute('disabled', 'disabled');
    });

    window.form.clearForm(filterForm);
    Array.from(filterFormElems)
    .map((item) => {
      item.setAttribute('disabled', 'disabled');
    });

    window.map.clearMap(window.move.pinsList);
    window.move.mainPin.style.top = window.util.MAIN_PIN_START_TOP_COORD;
    window.move.mainPin.style.left = window.util.MAIN_PIN_START_LEFT_COORD;

    window.form.setAddress(
        window.move.mainPin,
        window.util.MAIN_PIN_START_WIDTH,
        window.util.MAIN_PIN_START_HEIGHT
    );
  }

  function makePageActive(myMap, offerForm, offerFormElems) {
    myMap.classList.remove('map--faded');
    offerForm.classList.remove('ad-form--disabled');

    Array.from(offerFormElems)
    .map((item) => {
      item.removeAttribute('disabled');
    });

    window.load.load(successHandler, window.util.errorHandler);
  }

  makePageInactive(
      window.move.map,
      window.form.formOffer,
      window.form.formOfferElements,
      window.form.filtersForm,
      window.form.filtersFormElements);
  window.form.setAddress(
      window.move.mainPin,
      window.util.MAIN_PIN_START_WIDTH,
      window.util.MAIN_PIN_START_HEIGHT
  );

  window.move.mainPin.addEventListener('mousedown', window.move.onMainPinClick);
  window.move.mainPin.addEventListener('keydown', window.move.onMainPinEnter);

  window.map.pinsList.addEventListener('click', function (evt) {
    window.map.onPinClick(evt);
  });

  window.map.pinsList.addEventListener('keydown', function (evt) {
    window.map.onPinEnterPress(evt);
  });

  window.form.formOffer.addEventListener('submit', function (evt) {
    window.upload.upload(
        new FormData(window.form.formOffer),
        function () {
          makePageInactive(
              window.move.map,
              window.form.formOffer,
              window.form.formOfferElements,
              window.form.filtersForm,
              window.form.filtersFormElements
          );
          window.uploadMessages.showSuccessMessage();
        },
        window.uploadMessages.showErrorMessage
    );

    evt.preventDefault();
  });

  window.form.formOfferResetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    makePageInactive(
        window.move.map,
        window.form.formOffer,
        window.form.formOfferElements,
        window.form.filtersForm,
        window.form.filtersFormElements);
  });

  window.form.filterFormFeatures.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (evt.target.checked) {
        evt.target.checked = false;
      } else {
        evt.target.checked = true;
      }

      window.pinsFilter.saveFilters();
      window.pinsFilter.updatePinsWithDebounce(pins);
    }
  });

  window.form.filtersForm.addEventListener('change', function () {
    window.pinsFilter.saveFilters();
    window.pinsFilter.updatePinsWithDebounce(pins);
  });

  window.main = {
    changeToInactive: makePageInactive,
    changeToActive: makePageActive,
    pins,
    currentPins
  };
})();
