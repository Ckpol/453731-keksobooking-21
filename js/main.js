'use strict';

const MAP = document.querySelector('.map'); //
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
const OFFER_TIMEIN_LIST = ['после 12', 'после 13', 'после 14'];
const OFFER_TIMEOUT_LIST = ['выезд до 12', 'выезд до 13', 'выезд до 14'];
const OFFER_FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const OFFER_TITLE = ['Обычное объявление','Супер предложение','Скромное предложение',''];
const OFFER_PRICE = ['1000', '5000', '10000', '45000', '500000', ''];

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
    "title": `${getRandomItem(OFFER_TITLE)}`,
    "address": '',
    "price": `${getRandomItem(OFFER_PRICE)}`,
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

MAP.classList.remove('map--faded');
function renderPin(ad) {
  const pinElement = PIN_TEMPLATE_ITEM.cloneNode(true);
  const pinImg = pinElement.querySelector('img');
  pinElement.style.left = `${+ad.location['x'] - 25}px`;
  pinElement.style.top = `${+ad.location['y'] - 70}px`;
  pinImg.src = `${ad.author.avatar}`;
  pinImg.alt = `${ad.offer.title}`;
  return pinElement;
}


const filtersContainer = MAP.querySelector('.map__filters-container');
const pinTemplateCard = document.querySelector('#card');
const pinTemplateCardItem = pinTemplateCard
.content
.querySelector('.popup');

function renderPinCard(ad) {
  const pinCardElement = pinTemplateCardItem.cloneNode(true);
  const cardTitle = pinCardElement.querySelector('.popup__title');
  const cardAddress = pinCardElement.querySelector('.popup__text--address');
  const cardPrice = pinCardElement.querySelector('.popup__text--price');
  const cardRoomType = pinCardElement.querySelector('.popup__type');
  const cardCapacity = pinCardElement.querySelector('.popup__text--capacity');
  const cardTime = pinCardElement.querySelector('.popup__text--time');
  const cardFeatures = pinCardElement.querySelector('.popup__features');
  const cardDescription = pinCardElement.querySelector('.popup__description');
  const cardPhotos = pinCardElement.querySelector('.popup__photos');
  const cardAvvatar = pinCardElement.querySelector('.popup__avatar');
  const cardFeaturesList = cardFeatures.querySelectorAll('.popup__feature');
  const cardPhoto = cardPhotos.querySelector('.popup__photo');

  cardTitle.textContent = `${ad.offer.title}`;
  cardAddress.textContent = `${ad.offer.address}`;
  cardPrice.textContent = `${ad.offer.price} ₽/ночь`;
  cardRoomType.textContent = `${ad.offer.type}`;
  cardCapacity.textContent = `${ad.offer.rooms} ${ad.offer.guests}`;
  cardTime.textContent = `Заезд ${ad.offer.checkin}, ${ad.offer.checkout}`;

  const features = Array.from(cardFeaturesList);
  features.map((item, index) => {
    const result = item.classList.contains(`popup__feature--${ad.offer.features[index]}`);
    if (!result) {
      item.classList.add('hidden');
    }
  });

  cardDescription.textContent = `${ad.offer.description}`;

  ad.offer.photos.forEach((item, index) => {
    if (index === 0) {
      cardPhoto.src = item;
    }

    if (ad.offer.photos.length > 1 && index >= 1) {
      const cardPhotoImg = cardPhoto.cloneNode(true);
      cardPhotoImg.src = item;
      cardPhotos.appendChild(cardPhotoImg);
    }
  });

  cardAvvatar.src = `${ad.author.avatar}`;

  const textElem = pinCardElement.querySelectorAll('.popup__text');
  for (let key in ad.offer) {

    if (ad.offer[key] === '') {
      textElem.forEach((item) => {

        if (item.classList.contains(`popup__text--${key}`)) {
          item.classList.add('hidden');
        }
      });

      const elem = pinCardElement.querySelector(`.popup__${key}`);
      if (elem !== null) {
        elem.classList.add('hidden');
      }
    }
  }

  return pinCardElement;
}

const cardsFragment = document.createDocumentFragment();
cardsFragment.appendChild(renderPinCard(ads[0]));

const fragment = document.createDocumentFragment();
for (let i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

PINS_LIST.appendChild(fragment);
filtersContainer.before(cardsFragment);

