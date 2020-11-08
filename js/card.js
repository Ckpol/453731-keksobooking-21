'use strict';


(function () {
  const pinTemplateCard = document.querySelector('#card');
  const pinTemplateCardItem = pinTemplateCard
  .content
  .querySelector('.popup');
  const OFFER_TYPES = {
    'bungalow': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
    'any': 'Любой тип жилья'
  };

  window.card = {
    OFFER_TYPES,

    createPinCard: function (ad) {
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
      cardRoomType.textContent = OFFER_TYPES[`${ad.offer.type}`];
      cardCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
      cardTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

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

        if (ad.offer[key] === '' || ad.offer[key].length === 0) {
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
  };
})();
