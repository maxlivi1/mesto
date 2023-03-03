const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  inputErrorPostfix: '-error'
};

function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}${settings.inputErrorPostfix}`);

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}${settings.inputErrorPostfix}`);

  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

function isValid (formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function resetValidation (formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach((element) => {
    element.classList.remove(settings.inputErrorClass);
    const errorElement = formElement.querySelector(`.${element.id}${settings.inputErrorPostfix}`);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  });
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, submitButton, settings);
}

function setEventListenersForInput(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, submitButton, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, submitButton, settings);
    });
    inputElement.addEventListener('change', () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, submitButton, settings);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListenersForInput(formElement, settings);
  });
}

enableValidation(config);
