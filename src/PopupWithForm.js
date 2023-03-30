import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._popupForm = this.getPopup.querySelector('.popup__form');
    this._inputSelector = '.popup__input';
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues = () => {
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
  }

  close = () => {
    super.close();
    this._popupForm.reset();
  }
}
