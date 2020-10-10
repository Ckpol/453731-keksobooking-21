'use strict';

const FORM_OFFER = document.querySelector('.ad-form');

const FORM_OFFER_TITLE = FORM_OFFER.querySelector('#title');
const FORM_OFFER_PRICE = FORM_OFFER.querySelector('#price');

const FORM_OFFER_DESCRIPTION = FORM_OFFER.querySelector('#description');
const OBJECTS_QUANTITY = 8;
const MIN_RANDOM_NUMBER = 1;
const MAX_RANDOM_NUMBER = 8;

const PIN_TEMPLATE_LIST = document.querySelector('#pin');
const PIN_TEMPLATE_ITEM = PIN_TEMPLATE_LIST
.content
.querySelector('.map__pin');
const PINS_LIST = document.querySelector('.map__pins');
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

const ads = [];
function createAd(index, numbersArray) {
  const ad = {};
  ad.author = getAvatar(ad.author, index, numbersArray);
  ad.offer = getOffer(ad.offer);
  ad.location = getLocation(ad.location);
  ad.offer.address = ad.location.x + ', ' + ad.location.y;

  return ad;
}

for (let i = 0; i <= (OBJECTS_QUANTITY - 1); i++) {
  ads.push(createAd(i, randomNumbers));
}

document.querySelector('.map').classList.remove('map--faded');
function renderPin(ad) {
  const pinElement = PIN_TEMPLATE_ITEM.cloneNode(true);
  const pinImg = pinElement.querySelector('img');
  pinElement.style.left = `${+ad.location['x'] - 25}px`;
  pinElement.style.top = `${+ad.location['y'] - 70}px`;
  pinImg.src = `${ad.author.avatar}`;
  pinImg.alt = `${ad.offer.title}`;
  return pinElement;
}

const fragment = document.createDocumentFragment();
for (let i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

PINS_LIST.appendChild(fragment);
