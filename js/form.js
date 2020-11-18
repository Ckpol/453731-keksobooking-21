'use strict';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const formOffer = document.querySelector(`.ad-form`);
const filtersForm = document.querySelector(`.map__filters`);
const formOfferAddress = formOffer.querySelector(`#address`);
const formOfferElements = formOffer.querySelectorAll(`fieldset`);
const formOfferTitle = formOffer.querySelector(`#title`);
const formOfferPrice = formOffer.querySelector(`#price`);
const formOfferRoomNumber = formOffer.querySelector(`#room_number`);
const formOfferCapacity = formOffer.querySelector(`#capacity`);
const formOfferRoomType = formOffer.querySelector(`#type`);
const formOfferTimeIn = formOffer.querySelector(`#timein`);
const formOfferTimeOut = formOffer.querySelector(`#timeout`);
const formOfferResetButton = formOffer.querySelector(`.ad-form__reset`);
const filterFormFeatures = filtersForm.querySelector(`.map__features`);
const formOfferFeatures = formOffer.querySelector(`.features`);
const photosContainer = formOffer.querySelector(`.ad-form__photo`);
const MinTypeRoomPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};
const RoomsNumber = {
  ONE_ROOM: `1`,
  TWO_ROOMS: `2`,
  THREE_ROOMS: `3`,
  ONE_HUNDRED_ROOMS: `100`
};
const GuestsNumber = {
  NO_GUESTS: `0`,
  FOR_ONE_GUEST: `1`,
  FOR_TWO_GUESTS: `2`,
  FOR_THREE_GUESTS: `3`
};

formOfferTitle.addEventListener(`input`, () => {
  const valueLength = formOfferTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    formOfferTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    formOfferTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    formOfferTitle.setCustomValidity(``);
  }

  formOfferTitle.reportValidity();
});

const changeMinPriceByType = (myTarget, obj, minPrice) => {
  for (let key in obj) {
    if (key.toLowerCase() === myTarget) {
      minPrice.setAttribute(`min`, obj[key]);
      minPrice.setAttribute(`placeholder`, obj[key]);
    }
  }
};

formOfferRoomType.addEventListener(`change`, (evt) => {
  const typeOfRoom = evt.target.value;
  changeMinPriceByType(typeOfRoom, MinTypeRoomPrice, formOfferPrice);
});

formOfferPrice.addEventListener(`input`, () => {
  const priceValue = formOfferPrice.value;

  if (priceValue > MAX_PRICE_VALUE) {
    formOfferPrice.setCustomValidity(`Значение должно быть меньше или равно ${MAX_PRICE_VALUE}`);
  } else {
    formOfferPrice.setCustomValidity(``);
  }

  formOfferPrice.reportValidity();
});

const onSelectChangeHandler = () => {
  const roomType = formOfferRoomNumber.value;
  const guestQantity = formOfferCapacity.value;

  if ((roomType === RoomsNumber.ONE_ROOM)
  && (guestQantity !== GuestsNumber.FOR_ONE_GUEST)) {
    formOfferCapacity.setCustomValidity(`Недопустимый вариант для данного количества комнат`);
  } else if ((roomType === RoomsNumber.TWO_ROOMS)
  && ((guestQantity === GuestsNumber.NO_GUESTS || guestQantity === GuestsNumber.FOR_THREE_GUESTS))) {
    formOfferCapacity.setCustomValidity(`Недопустимый вариант для данного количества комнат 2`);

  } else if ((roomType === RoomsNumber.THREE_ROOMS)
  && (guestQantity === GuestsNumber.NO_GUESTS)) {
    formOfferCapacity.setCustomValidity(`Недопустимый вариант для данного количества комнат 3`);

  } else if ((roomType === RoomsNumber.ONE_HUNDRED_ROOMS)
  && (guestQantity !== GuestsNumber.NO_GUESTS)) {
    formOfferCapacity.setCustomValidity(`Недопустимый вариант для данного количества комнат 100`);

  } else {
    formOfferCapacity.setCustomValidity(``);
  }

  formOfferCapacity.reportValidity();
};

formOfferRoomNumber.addEventListener(`change`, onSelectChangeHandler);
formOfferCapacity.addEventListener(`change`, onSelectChangeHandler);

formOfferTimeIn.addEventListener(`change`, (evt) => {
  const target = evt.target;
  fitTime(target, formOfferTimeOut);
});

formOfferTimeOut.addEventListener(`change`, (evt) => {
  const target = evt.target;
  fitTime(target, formOfferTimeIn);
});

const fitTime = (activeElem, changedElem) => {
  if (activeElem.matches(`select[id="timein"]`)) {
    changedElem.selectedIndex = activeElem.selectedIndex;
  }

  if (activeElem.matches(`select[id="timeout"]`)) {
    changedElem.selectedIndex = activeElem.selectedIndex;
  }
};

const clearForm = (someForm) => {
  const form = someForm;
  const avatarImg = window.avatar.previewImg;
  const priceInput = form.querySelector(`#price`);

  if (avatarImg) {
    avatarImg.src = window.util.defaultImage;
  }

  if (priceInput) {
    priceInput.setAttribute(`min`, MinTypeRoomPrice.FLAT);
    priceInput.setAttribute(`placeholder`, MinTypeRoomPrice.FLAT);
  }

  if (photosContainer.children.length > 0) {
    photosContainer.removeChild(photosContainer.children[0]);
  }

  form.reset();
};

const setAddress = (pin, pinWidth, pinHeight) => {
  let left = getComputedStyle(pin).left;
  let top = getComputedStyle(pin).top;
  left = parseInt(left, 10) + Math.floor(pinWidth / 2);

  if (window.move.map.classList.contains(`map--faded`)) {
    pinHeight = Math.floor(pinHeight / 2);
  }

  top = parseInt(top, 10) + pinHeight;
  formOfferAddress.value = left + `, ` + top;
};

formOfferFeatures.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    evt.target.checked = (evt.target.checked) ? false : true;
    evt.preventDefault();
  }
});

window.form = {
  offer: formOffer,
  offerElements: formOfferElements,
  filters: filtersForm,
  filtersElements: filtersForm.children,
  offerResetButton: formOfferResetButton,
  clear: clearForm,
  setAddress,
  filterFeatures: filterFormFeatures,
  photosContainer
};
