import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._popupForm = this.getPopup().querySelector('.popup__form');
    this._inputSelector = '.popup__input';
    this._submitButton = this.getPopup().querySelector('[type="submit"]');
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues = () => {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }

  getForm() {
    return this._popupForm;
  }

  switchButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
