'use strict';
(function () {
  const fileChooser = window.form.formOffer.querySelector('.ad-form-header__input');
  const preview = window.form.formOffer.querySelector('.ad-form-header__preview');
  const previewImg = preview.querySelector('img');

  fileChooser.addEventListener('change', function () {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const isMatches = window.util.FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });

    if (isMatches) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
