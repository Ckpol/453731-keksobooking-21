'use strict';
(function () {
  const successMessageTemplate = document.querySelector(`#success`);
  const successMessageItem = successMessageTemplate
  .content
  .querySelector(`.success`);
  const errorMessageTemplate = document.querySelector(`#error`);
  const errorMessageItem = errorMessageTemplate
  .content
  .querySelector(`.error`);

  const main = document.querySelector(`main`);
  let currentMessage;
  let errorButton;

  const showSuccessMessage = () => {
    const message = successMessageItem.cloneNode(true);
    main.appendChild(message);
    currentMessage = main.querySelector(`.success`);
    document.addEventListener(`keydown`, onMessageEscPress);
    currentMessage.addEventListener(`click`, onMessageCloseClick);
  };

  const showErrorMessage = () => {
    const message = errorMessageItem.cloneNode(true);
    main.appendChild(message);
    currentMessage = main.querySelector(`.error`);
    errorButton = currentMessage.querySelector(`.error__button`);
    document.addEventListener(`keydown`, onMessageEscPress);
    currentMessage.addEventListener(`click`, onMessageCloseClick);
    errorButton.addEventListener(`click`, onMessageCloseClick);
  };

  const onMessageEscPress = (evt) => {
    window.util.isEscEvent(evt, closeMessage);
  };

  const onMessageCloseClick = () => {
    closeMessage();
  };

  const closeMessage = () => {
    const elemSuccess = main.querySelector(`.success`);
    const elemError = main.querySelector(`.error`);
    if (elemSuccess) {
      elemSuccess.remove();
    }
    if (elemError) {
      elemError.remove();
    }
    document.removeEventListener(`keydown`, onMessageEscPress);
    currentMessage.removeEventListener(`click`, onMessageCloseClick);
    if (errorButton) {
      errorButton.removeEventListener(`click`, onMessageCloseClick);
    }
  };

  window.uploadMessages = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage,
  };
})();
