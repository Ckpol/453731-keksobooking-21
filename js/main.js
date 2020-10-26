'use strict';
const map = document.querySelector('.map');

const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;

const formOffer = document.querySelector('.ad-form');
const formOfferTitle = formOffer.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const formOfferPrice = formOffer.querySelector('#price');
const MAX_PRICE_VALUE = 1000000;
const formOfferRoomNumber = formOffer.querySelector('#room_number');
const formOfferCapacity = formOffer.querySelector('#capacity');
const formOfferDescription = formOffer.querySelector('#description');
const formOfferAddress = formOffer.querySelector('#address');
const formOfferElements = formOffer.querySelectorAll('fieldset');

const OBJECTS_QUANTITY = 8;
const MIN_RANDOM_NUMBER = 1;
const MAX_RANDOM_NUMBER = 8;

const pinTemplateList = document.querySelector('#pin');
const pinTemplateItem = pinTemplateList
.content
.querySelector('.map__pin');
const pinsList = document.querySelector('.map__pins');
const mainPin = pinsList.querySelector('.map__pin--main');
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 70;
const MAIN_PIN_START_WIDTH = 65;
const MAIN_PIN_START_HEIGHT = 65;

const MAX_WIDTH_MAP = getComputedStyle(pinsList).width;

const OFFER_TYPES = ['Бунгало', 'Квартира', 'Дом', 'Дворец'];
const OFFER_ROOMS = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
const OFFER_GUEST = ['для 3 гостей', 'для 2 гостей', 'для 1 гостя', 'не для гостей'];
const OFFER_TIMEIN_LIST = ['После 12', 'После 13', 'После 14'];
const OFFER_TIMEOUT_LIST = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];
const OFFER_FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function rollRandom(min, max, n) {
  const collection = new Set();
  while (collection.size < n) {
    collection.add('0' + Math.floor(min + Math.random() * (max)));
  }
  return Array.from(collection);
}

const randomNumbers = rollRandom(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER, OBJECTS_QUANTITY);

function getRandomItem(arr) {
  const result = Math.floor(Math.random() * arr.length);
  return arr[result];

}

function getRandomItems(arr) {
  const result = [];
  const rolls = Math.floor(1 + Math.random() * arr.length);

  for (let i = 0; i < rolls; i++) {
    result.push(arr[i]);
  }
  return result;
}

function getAvatar(obj, index, numbersArray) {
  const number = numbersArray[index];
  return {
    "avatar": `img/avatars/user${number}.png`
  };
}

function getLocation() {
  const maxWidthNumber = parseInt(MAX_WIDTH_MAP, 10);
  return {
    "x": `${Math.floor(1 + Math.random() * (maxWidthNumber))}`,
    "y": `${Math.floor(130 + Math.random() * (630))}`
  };
}

function getOffer() {
  return {
    "title": `${formOfferTitle.value}`,
    "address": '',
    "price": `${formOfferPrice.value}`,
    "type": `${getRandomItem(OFFER_TYPES)}`,
    "rooms": `${getRandomItem(OFFER_ROOMS)}`,
    "guests": `${getRandomItem(OFFER_GUEST)}`,
    "checkin": `${getRandomItem(OFFER_TIMEIN_LIST)}`,
    "checkout": `${getRandomItem(OFFER_TIMEOUT_LIST)}`,
    "features": getRandomItems(OFFER_FEATURES_LIST),
    "description": `${formOfferDescription.placeholder}`,
    "photos": getRandomItems(OFFER_PHOTOS)
  };
}

function createAd(index, numbersArray) {
  const ad = {};
  ad.author = getAvatar(ad.author, index, numbersArray);
  ad.offer = getOffer(ad.offer);
  ad.location = getLocation(ad.location);
  ad.offer.address = ad.location.x + ', ' + ad.location.y;

  return ad;
}

function renderPin(ad) {
  const pinElement = pinTemplateItem.cloneNode(true);
  const pinImg = pinElement.querySelector('img');
  pinElement.style.left = `${+ad.location['x'] - 25}px`;
  pinElement.style.top = `${+ad.location['y'] - 70}px`;
  pinImg.src = `${ad.author.avatar}`;
  pinImg.alt = `${ad.offer.title}`;
  return pinElement;
}

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
  for (let i = 0; i <= (OBJECTS_QUANTITY - 1); i++) {
    ads.push(createAd(i, randomNumbers));
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }

  pinsList.appendChild(fragment);
}

function setAddress(pin, pinWidth, pinHeight) {
  let left = getComputedStyle(pin).left;
  let top = getComputedStyle(pin).top;
  left = parseInt(left, 10) + Math.floor(pinWidth / 2);

  if (map.classList.contains('map--faded')) {
    pinHeight = Math.floor(pinHeight / 2);
  }

  top = parseInt(top, 10) + pinHeight;
  formOfferAddress.value = left + ', ' + top;
}

makePageInactive(map, formOffer, formOfferElements, filtersForm, filtersFormElements);
setAddress(mainPin, MAIN_PIN_START_WIDTH, MAIN_PIN_START_HEIGHT);

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    makePageActive(map, formOffer, formOfferElements, filtersForm, filtersFormElements);
    setAddress(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
  }
}, {once: true});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    makePageActive(map, formOffer, formOfferElements, filtersForm, filtersFormElements);
    setAddress(mainPin, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
  }
});

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
