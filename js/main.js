'use strict';

(function () {
  const randomNumbers = window.util.getRandomArray(
      window.data.MIN_RANDOM_NUMBER,
      window.data.MAX_RANDOM_NUMBER,
      window.data.OBJECTS_QUANTITY
  );

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

    Array.from(myFormElements1)
    .map((item) => {
      item.setAttribute('disabled', 'disabled');
    });

    Array.from(myFormElements2)
    .map((item) => {
      item.setAttribute('disabled', 'disabled');
    });
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

    const ads = [];
    for (let i = 0; i <= (window.data.OBJECTS_QUANTITY - 1); i++) {
      ads.push(window.data.createAd(i, randomNumbers));
    }

    window.pin.renderPins(ads, window.move.pinsList);
    window.map.pinsList.addEventListener('click', function (evt) {
      window.map.onPinClick(evt, ads);
    });

    window.map.pinsList.addEventListener('keydown', function (evt) {
      window.map.onPinEnterPress(evt, ads);
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

  window.main = {
    changeToInactive: makePageInactive,
    changeToActive: makePageActive
  };


})();
