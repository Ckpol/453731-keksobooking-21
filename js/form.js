'use strict';

(function () {
  const formOffer = document.querySelector('.ad-form');
  const filtersForm = document.querySelector('.map__filters');
  const formOfferAddress = formOffer.querySelector('#address');
  const formOfferElements = formOffer.querySelectorAll('fieldset');
  const formOfferTitle = formOffer.querySelector('#title');
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const formOfferPrice = formOffer.querySelector('#price');
  const MAX_PRICE_VALUE = 1000000;
  const formOfferRoomNumber = formOffer.querySelector('#room_number');
  const formOfferCapacity = formOffer.querySelector('#capacity');
  const formOfferRoomType = formOffer.querySelector('#type');
  const formOfferTimeIn = formOffer.querySelector('#timein');
  const formOfferTimeOut = formOffer.querySelector('#timeout');
  const formOfferResetButton = formOffer.querySelector('.ad-form__reset');
  const MIN_TYPE_ROOM_PRICE = {
    'bungalow': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  formOfferTitle.addEventListener('input', function () {
    const valueLength = formOfferTitle.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      formOfferTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      formOfferTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      formOfferTitle.setCustomValidity('');
    }

    formOfferTitle.reportValidity();
  });

  function changeMinPriceByType(myTarget, obj, minPrice) {
    for (let key in obj) {
      if (key === myTarget) {
        minPrice.setAttribute('min', obj[key]);
        minPrice.setAttribute('placeholder', obj[key]);
      }
    }
  }

  formOfferRoomType.addEventListener('change', function (evt) {
    const typeOfRoom = evt.target.value;
    changeMinPriceByType(typeOfRoom, MIN_TYPE_ROOM_PRICE, formOfferPrice);
  });

  formOfferPrice.addEventListener('input', function () {
    const priceValue = formOfferPrice.value;

    if (priceValue > MAX_PRICE_VALUE) {
      formOfferPrice.setCustomValidity(`Значение должно быть меньше или равно ${MAX_PRICE_VALUE}`);
    } else {
      formOfferPrice.setCustomValidity('');
    }

    formOfferPrice.reportValidity();
  });

  formOfferCapacity.addEventListener('change', function (evt) {
    const guestQantity = evt.target.value;
    const roomType = formOfferRoomNumber.value;

    if ((roomType === '1') && (guestQantity !== '1')) {
      formOfferCapacity.setCustomValidity(`Недопустимый вариант для данного количества комнат`);

    } else if ((roomType === '2') && ((guestQantity === '0' || guestQantity === '3'))) {
      formOfferCapacity.setCustomValidity(`Недопустимый вариант для данного количества комнат 2`);

    } else if ((roomType === '3') && (guestQantity === '0')) {
      formOfferCapacity.setCustomValidity(`Недопустимый вариант для данного количества комнат 3`);

    } else if ((roomType === '100') && (guestQantity !== '0')) {
      formOfferCapacity.setCustomValidity(`Недопустимый вариант для данного количества комнат 100`);

    } else {
      formOfferCapacity.setCustomValidity('');
    }

    formOfferCapacity.reportValidity();
  });

  formOfferTimeIn.addEventListener('change', function (evt) {
    const target = evt.target;
    sincTime(target, formOfferTimeOut);
  });

  formOfferTimeOut.addEventListener('change', function (evt) {
    const target = evt.target;
    sincTime(target, formOfferTimeIn);
  });

  function sincTime(activeElem, changedElem) {
    if (activeElem.matches('select[id="timein"]')) {
      changedElem.selectedIndex = activeElem.selectedIndex;
    }

    if (activeElem.matches('select[id="timeout"]')) {
      changedElem.selectedIndex = activeElem.selectedIndex;
    }
  }

  window.form = {
    formOffer,
    formOfferElements,
    filtersForm,
    filtersFormElements: filtersForm.children,
    formOfferResetButton,

    clearForm: function () {
      const form = formOffer;
      form.reset();
    },

    setAddress: function (pin, pinWidth, pinHeight) {
      let left = getComputedStyle(pin).left;
      let top = getComputedStyle(pin).top;
      left = parseInt(left, 10) + Math.floor(pinWidth / 2);

      if (window.move.map.classList.contains('map--faded')) {
        pinHeight = Math.floor(pinHeight / 2);
      }

      top = parseInt(top, 10) + pinHeight;
      formOfferAddress.value = left + ', ' + top;
    }
  };
})();
