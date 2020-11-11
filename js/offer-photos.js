'use strict';

(function () {
  const fileChooser = window.form.formOffer.querySelector('.ad-form__input');
  const preview = window.form.formOffer.querySelector('.ad-form__photo');
  let currentImg;


  fileChooser.addEventListener('change', function () {
    if (preview.children.length >= 1) {
      preview.removeChild(currentImg);
    }
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const isMatches = window.util.FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });

    if (isMatches) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.style.position = 'relative';
        const imgElem = document.createElement('img');
        currentImg = imgElem;
        imgElem.width = window.util.PREVIEW_CONTAINER_WIDTH;
        imgElem.height = window.util.PREVIEW_CONTAINER_HEIGHT;
        imgElem.alt = 'Фотография помещения';
        imgElem.src = reader.result;

        preview.insertAdjacentElement('afterbegin', imgElem);
      });

      reader.readAsDataURL(file);
    }
  });
})();
