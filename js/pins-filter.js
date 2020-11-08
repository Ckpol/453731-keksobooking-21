'use strict';
(function () {
  const housingType = window.form.filtersForm.querySelector('#housing-type');
  // const housingPrice = window.form.filtersForm.querySelector('#housing-price');
  // const housingRooms = window.form.filtersForm.querySelector('#housing-rooms');
  // const housingGuests = window.form.filtersForm.querySelector('#housing-guests');
  // const housingFeatures = window.form.filtersForm.querySelector('#housing-features');


  function updatePins(arr, evt) {
    const sameHousingType = arr.filter(function (item) {
      return item.offer.type === evt.target.value;
    });
    window.map.clearMap(window.move.pinsList);

    if (evt.target.value === 'any') {
      window.main.currentPins = arr;
      window.pin.renderPins(arr);
    } else {
      window.main.currentPins = sameHousingType;
      window.pin.renderPins(sameHousingType);
    }
  }

  window.pinsFilter = {
    housingType,
    updatePins
  };

})();
