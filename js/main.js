'use strict';

(function () {
  function makePageInactive(myMap, myForm1, myFormElements1, myForm2, myFormElements2) {

    if (!myMap.classList.contains('map--faded')) {
      myMap.classList.add('map--faded');
    }

    if (!myForm1.classList.contains('ad-form--disabled')) {
      myForm1.classList.add('ad-form--disabled');
    }

    if (!myForm2.classList.contains('map__filters--disabled')) {
      myForm2.classList.add('map__filters--disabled');
    }
    window.form.clearForm(myFormElements1);
    Array.from(myFormElements1)
    .map((item) => {
      item.setAttribute('disabled', 'disabled');
    });

    window.form.clearForm(myFormElements2);
    Array.from(myFormElements2)
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

  function makePageActive(myMap, myForm1, myFormElements1, myForm2, myFormElements2) {
    myMap.classList.remove('map--faded');
    myForm1.classList.remove('ad-form--disabled');
    myForm2.classList.remove('map__filters--disabled');
    Array.from(myFormElements1)
    .map((item) => {
      item.removeAttribute('disabled');
    });

    Array.from(myFormElements2)
    .map((item) => {
      item.removeAttribute('disabled');
    });

    window.load.load(window.pin.renderPins, window.load.errorHandler, window.data.saveData);

    window.map.pinsList.addEventListener('click', function (evt) {
      window.map.onPinClick(evt, window.load.ads);
    });

    window.map.pinsList.addEventListener('keydown', function (evt) {
      window.map.onPinEnterPress(evt, window.load.ads);
    });
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
          window.uploadMessages.showSuccessMesage();
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

  window.main = {
    changeToInactive: makePageInactive,
    changeToActive: makePageActive
  };
})();
