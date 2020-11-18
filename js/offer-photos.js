'use strict';

const fileChooser = window.form.offer.querySelector(`.ad-form__input`);
let currentImg;

fileChooser.addEventListener(`change`, () => {
  if (fileChooser.files.length === 0) {
    return;
  }
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const isMatches = window.util.FILE_TYPES.some((item) => {
    return fileName.endsWith(item);
  });

  if (window.form.photosContainer.children.length > 0) {
    window.form.photosContainer.removeChild(currentImg);
  }

  if (isMatches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      const imgElem = document.createElement(`img`);
      currentImg = imgElem;
      imgElem.width = window.util.PREVIEW_CONTAINER_WIDTH;
      imgElem.height = window.util.PREVIEW_CONTAINER_HEIGHT;
      imgElem.alt = `Фотография помещения`;
      imgElem.src = reader.result;

      window.form.photosContainer.insertAdjacentElement(`afterbegin`, imgElem);
    });

    reader.readAsDataURL(file);
  }
});

