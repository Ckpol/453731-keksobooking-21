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

    window.load.load(window.pin.renderPins, errorHandler, window.data.saveData);

    window.map.pinsList.addEventListener('click', function (evt) {
      window.map.onPinClick(evt, window.load.ads);
    });

    window.map.pinsList.addEventListener('keydown', function (evt) {
      window.map.onPinEnterPress(evt, window.load.ads);
    });
  }

  function errorHandler(errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
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
