class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
    this._submitButton = form.querySelector('[type="submit"]');
  }

  _getErrorElement(inputElement) {
    return this._form.querySelector(`.${inputElement.id}${this._config.inputErrorPostfix}`);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleSubmitState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  _resetValidation() {
    this._inputList.forEach(element => this._hideInputError(element));
    this._toggleSubmitState();
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleSubmitState();
      });
    });
  }

  enableValidation() {
    this._resetValidation();
    this._setEventListeners();
  }
}

const config = {
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  inputErrorPostfix: '-error',
};

export { FormValidator, config as validatorConfig };
