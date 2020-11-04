'use strict';

(function () {
  const map = document.querySelector('.map');
  const pinsList = document.querySelector('.map__pins');
  const mainPin = pinsList.querySelector('.map__pin--main');
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 70;
  const MIN_COORD_Y = 130 - MAIN_PIN_HEIGHT;
  const MAX_COORD_Y = 630 - MAIN_PIN_HEIGHT;
  const MIN_COORD_X = 0 - Math.floor(MAIN_PIN_WIDTH / 2);
  const MAX_COORD_X = parseInt(window.util.MAX_WIDTH_MAP, 10) - Math.floor(MAIN_PIN_WIDTH / 2);

  window.move = {
    map: map,
    pinsList: pinsList,
    mainPin: mainPin,

    onMainPinEnter: function (evt) {
      if ((evt.key === 'Enter' || evt.key === ' ') && map.classList.contains('map--faded')) {
        window.main.changeToActive(
            map,
            window.form.formOffer,
            window.form.formOfferElements,
            window.form.filtersForm,
            window.form.filtersFormElements);
        window.form.setAddress(
            mainPin,
            MAIN_PIN_WIDTH,
            MAIN_PIN_HEIGHT
        );
      }
    },

    onMainPinClick: function (evt) {
      evt.preventDefault();

      if (evt.button === 0 && map.classList.contains('map--faded')) {
        window.main.changeToActive(
            map,
            window.form.formOffer,
            window.form.formOfferElements,
            window.form.filtersForm,
            window.form.filtersFormElements);
        window.form.setAddress(
            mainPin,
            MAIN_PIN_WIDTH,
            MAIN_PIN_HEIGHT
        );
      }

      let starCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      function omMouseMove(moveEvt) {
        moveEvt.preventDefault();

        const shift = {
          x: starCoords.x - moveEvt.clientX,
          y: starCoords.y - moveEvt.clientY
        };

        starCoords = {
          x: moveEvt.x,
          y: moveEvt.y
        };

        let resultTop = mainPin.offsetTop - shift.y;
        let resultLeft = mainPin.offsetLeft - shift.x;

        if (resultTop > MAX_COORD_Y) {
          resultTop = MAX_COORD_Y;
        } else if (resultTop < MIN_COORD_Y) {
          resultTop = MIN_COORD_Y;
        }

        if (resultLeft > MAX_COORD_X) {
          resultLeft = MAX_COORD_X;
        } else if (resultLeft < MIN_COORD_X) {
          resultLeft = MIN_COORD_X;
        }

        mainPin.style.top = resultTop + 'px';
        mainPin.style.left = resultLeft + 'px';
        window.form.setAddress(
            mainPin,
            MAIN_PIN_WIDTH,
            MAIN_PIN_HEIGHT
        );
      }

      function omMouseUp(upEvt) {
        upEvt.preventDefault();
        window.form.setAddress(
            mainPin,
            MAIN_PIN_WIDTH,
            MAIN_PIN_HEIGHT
        );

        pinsList.removeEventListener('mousemove', omMouseMove);
        pinsList.removeEventListener('mouseup', omMouseUp);
      }

      pinsList.addEventListener('mousemove', omMouseMove);
      pinsList.addEventListener('mouseup', omMouseUp);
    }
  };
})();