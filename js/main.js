'use strict';

const FORM_OFFER = document.querySelector('.ad-form');

// const FORM_OFFER_ELEMENTS = FORM_OFFER.querySelectorAll('.ad-form__element');
const FORM_OFFER_TITLE = FORM_OFFER.querySelector('#title');
const FORM_OFFER_ADDRESS = FORM_OFFER.querySelector('#address');
const FORM_OFFER_PRICE = FORM_OFFER.querySelector('#price');
const FORM_OFFER_TYPE = FORM_OFFER.querySelector('#type');
const FORM_OFFER_ROOM_NUMBER = FORM_OFFER.querySelector('#room_number');
const FORM_OFFER_CAPACITY = FORM_OFFER.querySelector('#capacity');
const FORM_OFFER_TIMEIN = FORM_OFFER.querySelector('#timein');
const FORM_OFFER_TIMEOUT = FORM_OFFER.querySelector('#timeout');

// const FORM_OFFER_FEATURES_LIST = FORM_OFFER.querySelector('.features');
// const CHECKED_FEAURES = FORM_OFFER_FEATURES_LIST.querySelectorAll('.feature__checkbox:checked');

const FORM_OFFER_DESCRIPTION = FORM_OFFER.querySelector('#description');
const OBJECTS_QUANTITY = 8;
const MIN_RANDOM_NUMBER = 1;
const MAX_RANDOM_NUMBER = 8;

const PIN_TEMPLATE_LIST = document.querySelector('#pin');
const PIN_TEMPLATE_ITEM = PIN_TEMPLATE_LIST
.content
.querySelector('.map__pin');
const PINS_LIST = document.querySelector('.map__pins');


function rollRandom(min, max, n) {
  let collection = new Set();
  while (collection.size < n) {
    collection.add('0' + Math.floor(min + Math.random() * (max)));
  }
  return Array.from(collection);
}

let randomNumbers = rollRandom(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER, OBJECTS_QUANTITY);

function getAvatar(obj, index, numbersArray) {
  let number = numbersArray[index];
  return {
    "avatar": `img/avatars/user${number}.png`
  };
}

function getOffer() {
  return {
    "title": `${FORM_OFFER_TITLE.value}`,
    "address": `${FORM_OFFER_ADDRESS.value}`,
    "price": `${FORM_OFFER_PRICE.value}`,
    "type": `${FORM_OFFER_TYPE.value}`,
    "rooms": `${FORM_OFFER_ROOM_NUMBER.value}`,
    "guests": `${FORM_OFFER_CAPACITY.value}`,
    "checkin": `${FORM_OFFER_TIMEIN.value}`,
    "checkout": `${FORM_OFFER_TIMEOUT.value}`,
    "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
    "description": `${FORM_OFFER_DESCRIPTION.placeholder}`,
    "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  };
}

function getLocation() {
  return {
    "x": `${Math.floor(100 + Math.random() * (600))}`,
    "y": `${Math.floor(130 + Math.random() * (630))}`
  };
}

let ads = [];
function createAd(index, numbersArray) {
  let ad = {};

  ad["author"] = getAvatar(ad["author"], index, numbersArray);
  ad["offer"] = getOffer(ad["offer"]);
  ad["location"] = getLocation(ad["location"]);
  return ad;
}

for (let i = 0; i <= (OBJECTS_QUANTITY - 1); i++) {
  ads.push(createAd(i, randomNumbers));
}

document.querySelector('.map').classList.remove('map--faded');
function renderPin(ad) {
  let pinElement = PIN_TEMPLATE_ITEM.cloneNode(true);
  let pinImg = PIN_TEMPLATE_ITEM.querySelector('img');
  pinElement.style.left = "{{location.x + смещение по X}}px";
  pinElement.style.top = "{{location.y + смещение по Y}}px";
  pinImg.src = `${ad["author"].avatar}`;
  pinImg.alt = `${ad["offer"].title}`;

  return pinElement;
}

let fragment = document.createDocumentFragment();
for (let i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

PINS_LIST.appendChild(fragment);
