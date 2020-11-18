'use strict';

const pinTemplateCard = document.querySelector(`#card`);
const pinTemplateCardItem = pinTemplateCard
.content
.querySelector(`.popup`);
const OfferTypes = {
  BUNGALOW: `Бунгало`,
  FLAT: `Квартира`,
  HOUSE: `Дом`,
  PALACE: `Дворец`,
  ANY: `Любой тип жилья`
};

const offerPrice = [
  {
    title: `any`,
    minValue: ``,
    maxValue: ``
  },
  {
    title: `middle`,
    minValue: `10000`,
    maxValue: `50000`
  },
  {
    title: `low`,
    minValue: ``,
    maxValue: `10000`
  },
  {
    title: `high`,
    minValue: `50000`,
    maxValue: Infinity
  }
];

const createPinCard = (ad) => {
  const pinCardElement = pinTemplateCardItem.cloneNode(true);
  const cardTitle = pinCardElement.querySelector(`.popup__title`);
  const cardAddress = pinCardElement.querySelector(`.popup__text--address`);
  const cardPrice = pinCardElement.querySelector(`.popup__text--price`);
  const cardRoomType = pinCardElement.querySelector(`.popup__type`);
  const cardCapacity = pinCardElement.querySelector(`.popup__text--capacity`);
  const cardTime = pinCardElement.querySelector(`.popup__text--time`);
  const cardFeatures = pinCardElement.querySelector(`.popup__features`);
  const cardDescription = pinCardElement.querySelector(`.popup__description`);
  const cardPhotos = pinCardElement.querySelector(`.popup__photos`);
  const cardAvatar = pinCardElement.querySelector(`.popup__avatar`);
  const cardFeaturesList = cardFeatures.querySelectorAll(`.popup__feature`);
  const cardPhoto = cardPhotos.querySelector(`.popup__photo`);
  const textElems = pinCardElement.querySelectorAll(`.popup__text`);

  const features = Array.from(cardFeaturesList);
  features.map((item) => {
    const featureType = item.className.split(`--`)[1];
    if (!ad.offer.features.includes(featureType)) {
      item.classList.add(`hidden`);
    }
  });

  cardTitle.textContent = `${ad.offer.title}`;
  cardAddress.textContent = `${ad.offer.address}`;
  cardPrice.textContent = `${ad.offer.price} ₽/ночь`;
  cardRoomType.textContent = OfferTypes[`${ad.offer.type.toUpperCase()}`];
  cardCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  cardTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
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

  cardAvatar.src = `${ad.author.avatar}`;

  for (let key in ad.offer) {

    if (ad.offer[key] === `` || ad.offer[key].length === 0) {
      const elem = pinCardElement.querySelector(`.popup__${key}`);
      textElems.forEach((item) => {

        if (item.classList.contains(`popup__text--${key}`)) {
          item.classList.add(`hidden`);
        }
      });
      elem.classList.add(`hidden`);
    }
  }

  return pinCardElement;
};


window.card = {
  offerPrice,
  createPinInfo: createPinCard
};
