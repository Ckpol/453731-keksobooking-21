'use strict';
(function () {
  const fileChooser = window.form.offer.querySelector(`.ad-form-header__input`);
  const preview = window.form.offer.querySelector(`.ad-form-header__preview`);
  const previewImg = preview.querySelector(`img`);

  fileChooser.addEventListener(`change`, () => {
    if (fileChooser.files.length === 0) {
      return;
    }
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const isMatches = window.util.FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });

    if (isMatches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        previewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  window.avatar = {
    previewImg
  };
})();
