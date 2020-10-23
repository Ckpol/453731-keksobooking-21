'use strict';
const MAP = document.querySelector('.map');

const FILTERS_FORM = document.querySelector('.map__filters');
const FILTERS_FORM_ELEMENTS = FILTERS_FORM.children;

const FORM_OFFER = document.querySelector('.ad-form');
const FORM_OFFER_TITLE = FORM_OFFER.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const FORM_OFFER_PRICE = FORM_OFFER.querySelector('#price');
const MAX_PRICE_VALUE = 1000000;
const FORM_OFFER_ROOM_NUMBER = FORM_OFFER.querySelector('#room_number');
const FORM_OFFER_CAPACITY = FORM_OFFER.querySelector('#capacity');
const FORM_OFFER_DESCRIPTION = FORM_OFFER.querySelector('#description');
const FORM_OFFER_ADDRESS = FORM_OFFER.querySelector('#address');
const FORM_OFFER_ELEMENTS = FORM_OFFER.querySelectorAll('fieldset');

const OBJECTS_QUANTITY = 8;
const MIN_RANDOM_NUMBER = 1;
const MAX_RANDOM_NUMBER = 8;

const PIN_TEMPLATE_LIST = document.querySelector('#pin');
const PIN_TEMPLATE_ITEM = PIN_TEMPLATE_LIST
.content
.querySelector('.map__pin');
const PINS_LIST = document.querySelector('.map__pins');
const MAIN_PIN = PINS_LIST.querySelector('.map__pin--main');
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 70;
const MAIN_PIN_START_WIDTH = 65;
const MAIN_PIN_START_HEIGHT = 65;

const MAX_WIDTH_MAP = getComputedStyle(PINS_LIST).width;

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
    "title": `${FORM_OFFER_TITLE.value}`,
    "address": '',
    "price": `${FORM_OFFER_PRICE.value}`,
    "type": `${getRandomItem(OFFER_TYPES)}`,
    "rooms": `${getRandomItem(OFFER_ROOMS)}`,
    "guests": `${getRandomItem(OFFER_GUEST)}`,
    "checkin": `${getRandomItem(OFFER_TIMEIN_LIST)}`,
    "checkout": `${getRandomItem(OFFER_TIMEOUT_LIST)}`,
    "features": getRandomItems(OFFER_FEATURES_LIST),
    "description": `${FORM_OFFER_DESCRIPTION.placeholder}`,
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
  const pinElement = PIN_TEMPLATE_ITEM.cloneNode(true);
  const pinImg = pinElement.querySelector('img');
  pinElement.style.left = `${+ad.location['x'] - 25}px`;
  pinElement.style.top = `${+ad.location['y'] - 70}px`;
  pinImg.src = `${ad.author.avatar}`;
  pinImg.alt = `${ad.offer.title}`;
  return pinElement;
}

function makePageInactive(map, myForm1, myFormElements1, myForm2, myFormElements2) {

  if (!map.classList.contains('map--faded')) {
    map.classList.add('map--faded');
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

function makePageActive(map, myForm1, myFormElements1, myForm2, myFormElements2) {
  map.classList.remove('map--faded');
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

  PINS_LIST.appendChild(fragment);
}

function setAddress(pin, pinWidth, pinHeight) {
  let left = getComputedStyle(pin).left;
  let top = getComputedStyle(pin).top;
  left = parseInt(left, 10) + Math.floor(pinWidth / 2);

  if (MAP.classList.contains('map--faded')) {
    pinHeight = Math.floor(pinHeight / 2);
  }

  top = parseInt(top, 10) + pinHeight;
  FORM_OFFER_ADDRESS.value = left + ', ' + top;
}

makePageInactive(MAP, FORM_OFFER, FORM_OFFER_ELEMENTS, FILTERS_FORM, FILTERS_FORM_ELEMENTS);
setAddress(MAIN_PIN, MAIN_PIN_START_WIDTH, MAIN_PIN_START_HEIGHT);

MAIN_PIN.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    makePageActive(MAP, FORM_OFFER, FORM_OFFER_ELEMENTS, FILTERS_FORM, FILTERS_FORM_ELEMENTS);
    setAddress(MAIN_PIN, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
  }
}, {once: true});

MAIN_PIN.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    makePageActive(MAP, FORM_OFFER, FORM_OFFER_ELEMENTS, FILTERS_FORM, FILTERS_FORM_ELEMENTS);
    setAddress(MAIN_PIN, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
  }
});

FORM_OFFER_TITLE.addEventListener('input', function () {
  const valueLength = FORM_OFFER_TITLE.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    FORM_OFFER_TITLE.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    FORM_OFFER_TITLE.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    FORM_OFFER_TITLE.setCustomValidity('');
  }

  FORM_OFFER_TITLE.reportValidity();

});

FORM_OFFER_PRICE.addEventListener('input', function () {
  const priceValue = FORM_OFFER_PRICE.value;

  if (priceValue > MAX_PRICE_VALUE) {
    FORM_OFFER_PRICE.setCustomValidity(`Значение должно быть меньше или равно ${MAX_PRICE_VALUE}`);
  } else {
    FORM_OFFER_PRICE.setCustomValidity('');
  }

  FORM_OFFER_PRICE.reportValidity();
});

FORM_OFFER_CAPACITY.addEventListener('change', function (evt) {
  const guestQantity = evt.target.value;
  const roomType = FORM_OFFER_ROOM_NUMBER.value;

  if ((roomType === '1') && (guestQantity !== '1')) {
    FORM_OFFER_CAPACITY.setCustomValidity(`Недопустимый вариант для данного количества комнат`);

  } else if ((roomType === '2') && ((guestQantity === '0' || guestQantity === '3'))) {
    FORM_OFFER_CAPACITY.setCustomValidity(`Недопустимый вариант для данного количества комнат 2`);

  } else if ((roomType === '3') && (guestQantity === '0')) {
    FORM_OFFER_CAPACITY.setCustomValidity(`Недопустимый вариант для данного количества комнат 3`);

  } else if ((roomType === '100') && (guestQantity !== '0')) {
    FORM_OFFER_CAPACITY.setCustomValidity(`Недопустимый вариант для данного количества комнат 100`);

  } else {
    FORM_OFFER_CAPACITY.setCustomValidity('');
  }

  FORM_OFFER_CAPACITY.reportValidity();
});
