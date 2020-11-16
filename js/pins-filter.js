'use strict';
(function () {

  const filterCheckboxList = window.form.filters.querySelectorAll(`.map__checkbox`);
  const filterSelectList = window.form.filters.querySelectorAll(`.map__filter`);
  let filters = {
    'housing-type': `any`,
    'housing-price': `any`,
    'housing-rooms': `any`,
    'housing-guests': `any`,
    'features': []
  };
  let min;
  let max;
  const updatePinsWithDebounce = window.debounce((arr) => {
    updatePins(arr);
  });

  const saveFilters = () => {

    Array.from(filterSelectList).forEach((item) => {
      filters[item.id] = item.value;
      if (item.id === `housing-price`) {

        window.card.offerPrice.forEach((elem) => {
          if (item.value === elem.title) {
            min = elem.minValue;
            max = elem.maxValue;
          }
        });
      }
    });

    filters.features = [];
    filterCheckboxList.forEach((item) => {
      if (item.checked === true) {
        filters.features.push(item.value);
      }
    });
  };

  const updatePins = (arr) => {
    let filteredPins = [];
    const isTypeNotAny = filters[`housing-type`] !== `any`;
    const isPriceNotAny = filters[`housing-price`] !== `any`;
    const isRoomNotAny = filters[`housing-rooms`] !== `any`;
    const isGuestNotAny = filters[`housing-guests`] !== `any`;

    if (arr.length !== 0) {
      for (let i = 0; i < arr.length; i++) {

        if (arr[i].offer.type !== filters[`housing-type`]
        && isTypeNotAny) {
          continue;
        }

        if (isPriceNotAny
        && !(min <= arr[i].offer.price && max >= arr[i].offer.price)) {
          continue;
        }

        if (isRoomNotAny
        && arr[i].offer.rooms !== parseInt(filters[`housing-rooms`], 10)) {
          continue;
        }

        if (isGuestNotAny
        && arr[i].offer.guests !== parseInt(filters[`housing-guests`], 10)) {
          continue;
        }

        let flag = true;
        filters.features.forEach((feature) => {
          if (!arr[i].offer.features.includes(feature)) {
            flag = false;
          }
        });
        if (!flag) {
          continue;
        }

        filteredPins.push(arr[i]);
        if (filteredPins.lenght >= window.util.PINS_NUMBER) {
          break;
        }
      }
      window.map.clear(window.move.pinsList);
      window.pin.render(filteredPins);
    }
  };

  window.pinsFilter = {
    saveData: saveFilters,
    updateWithDebounce: updatePinsWithDebounce
  };
})();
