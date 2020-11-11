'use strict';
(function () {

  const filterCheckboxList = window.form.filtersForm.querySelectorAll('.map__checkbox');
  const filterSelectList = window.form.filtersForm.querySelectorAll('.map__filter');
  let filters = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'features': []
  };
  let min;
  let max;

  function saveFilters() {

    Array.from(filterSelectList).forEach((item) => {
      filters[item.id] = item.value;
      if (item.id === 'housing-price') {

        window.card.OFFER_PRICE.forEach((elem) => {
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
  }

  function updatePins(arr) {
    let filteredPins = arr;

    if (filters['housing-type'] !== 'any') {
      filteredPins = filteredPins.filter((item) => {
        return item.offer.type === filters['housing-type'];
      });
    }

    if (filters['housing-price'] !== 'any') {

      filteredPins = filteredPins.filter((item) => {
        let result = true;

        switch (filters['housing-price']) {
          case 'middle':
            result = item.offer.price >= min && item.offer.price <= max;
            break;
          case 'low':
            result = item.offer.price <= max;
            break;
          case 'high':
            result = item.offer.price >= min;
            break;
        }

        return result;
      });
    }

    if (filters['housing-rooms'] !== 'any') {
      filteredPins = filteredPins.filter((item) => {
        return item.offer.rooms === parseInt(filters['housing-rooms'], 10);
      });
    }

    if (filters['housing-guests'] !== 'any') {
      filteredPins = filteredPins.filter((item) => {
        return item.offer.guests === parseInt(filters['housing-guests'], 10);
      });
    }

    filteredPins = filters.features.reduce((acc, feature) => {
      return acc.filter((item)=> {
        return item.offer.features.includes(feature);
      });
    }, filteredPins);

    window.map.clearMap(window.move.pinsList);
    window.pin.renderPins(filteredPins);
  }

  const updatePinsWithDebounce = window.debounce(function (arr) {
    updatePins(arr);
  });

  window.pinsFilter = {
    updatePins,
    saveFilters,
    filterCheckboxList,
    updatePinsWithDebounce
  };
})();
