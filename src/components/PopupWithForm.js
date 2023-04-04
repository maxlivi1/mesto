import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._popupForm = this.getPopup().querySelector('.popup__form');
    this._inputSelector = '.popup__input';
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

  getForm() {
    return this._popupForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
