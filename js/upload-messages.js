'use strict';
(function () {
  const successMessageTemplate = document.querySelector('#success');
  const successMessageItem = successMessageTemplate
  .content
  .querySelector('.success');
  const errorMessageTemplate = document.querySelector('#error');
  const errorMessageItem = errorMessageTemplate
  .content
  .querySelector('.error');

  const main = document.querySelector('main');
  const fragment = document.createDocumentFragment();
  let currentMessage;
  let errorButton;

  function showSuccessMessage() {
    const message = successMessageItem.cloneNode(true);
    fragment.appendChild(message);
    main.appendChild(fragment);

    currentMessage = main.querySelector('.success');
    document.addEventListener('keydown', onMessageEscPress);
    currentMessage.addEventListener('click', onMessageCloseClick);
  }

  function showErrorMessage() {
    const message = errorMessageItem.cloneNode(true);
    fragment.appendChild(message);
    main.appendChild(fragment);

    currentMessage = main.querySelector('.error');
    errorButton = currentMessage.querySelector('.error__button');
    document.addEventListener('keydown', onMessageEscPress);
    currentMessage.addEventListener('click', onMessageCloseClick);
    errorButton.addEventListener('click', onMessageCloseClick);
  }

  function onMessageEscPress(evt) {
    window.util.isEscEvent(evt, closeMessage);
  }

  function onMessageCloseClick() {
    closeMessage();
  }

  function closeMessage() {
    const elemSuccess = main.querySelector('.success');
    const elemError = main.querySelector('.error');
    if (elemSuccess) {
      elemSuccess.remove();
    }
    if (elemError) {
      elemError.remove();
    }
    document.removeEventListener('keydown', onMessageEscPress);
    currentMessage.removeEventListener('click', onMessageCloseClick);
    if (errorButton && elemError !== null) {
      errorButton.removeEventListener('click', onMessageCloseClick);
    }
  }

  window.uploadMessages = {
    showSuccessMessage,
    showErrorMessage,
    closeMessage
  };
})();
