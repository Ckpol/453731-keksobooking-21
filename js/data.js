'use strict';

(function () {
  const OFFER_TYPES = ['Бунгало', 'Квартира', 'Дом', 'Дворец'];

  const OFFER_ROOMS = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
  const OFFER_GUEST = ['для 3 гостей', 'для 2 гостей', 'для 1 гостя', 'не для гостей'];
  const OFFER_TIMEIN_LIST = ['после 12', 'после 13', 'после 14'];
  const OFFER_TIMEOUT_LIST = ['выезд до 12', 'выезд до 13', 'выезд до 14'];
  const OFFER_FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const OFFER_TITLE = ['Обычное объявление', 'Супер предложение', 'Скромное предложение', ''];
  const OFFER_PRICE = ['1000', '5000', '10000', '45000', '500000', ''];
  const formOffer = document.querySelector('.ad-form');
  const formOfferDescription = formOffer.querySelector('#description');

  function getAvatar(obj, index, numbersArray) {
    const number = numbersArray[index];
    return {
      "avatar": `img/avatars/user${number}.png`
    };
  }

  function getLocation() {
    const maxWidthNumber = parseInt(window.util.MAX_WIDTH_MAP, 10);
    return {
      "x": `${Math.floor(1 + Math.random() * (maxWidthNumber))}`,
      "y": `${Math.floor(130 + Math.random() * (630))}`
    };
  }

  function getOffer() {
    return {

      "title": `${window.util.getRandomItem(OFFER_TITLE)}`,
      "address": '',
      "price": `${window.util.getRandomItem(OFFER_PRICE)}`,
      "type": `${window.util.getRandomItem(OFFER_TYPES)}`,
      "rooms": `${window.util.getRandomItem(OFFER_ROOMS)}`,
      "guests": `${window.util.getRandomItem(OFFER_GUEST)}`,
      "checkin": `${window.util.getRandomItem(OFFER_TIMEIN_LIST)}`,
      "checkout": `${window.util.getRandomItem(OFFER_TIMEOUT_LIST)}`,
      "features": window.util.getRandomItems(OFFER_FEATURES_LIST),
      "description": `${formOfferDescription.placeholder}`,
      "photos": window.util.getRandomItems(OFFER_PHOTOS)
    };
  }

  window.data = {
    OBJECTS_QUANTITY: 8,
    MIN_RANDOM_NUMBER: 1,
    MAX_RANDOM_NUMBER: 8,

    createAd: function (index, numbersArray) {
      const ad = {};
      ad.author = getAvatar(ad.author, index, numbersArray);
      ad.offer = getOffer(ad.offer);
      ad.location = getLocation(ad.location);
      ad.offer.address = ad.location.x + ', ' + ad.location.y;

      return ad;
    },

    saveData: function (arr, elem) {
      arr.map((item) => {
        elem.push(item);
      });

    }
  };
})();
