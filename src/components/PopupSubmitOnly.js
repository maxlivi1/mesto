import Popup from "./Popup.js";

export default class PopupSubmitOnly extends Popup {

  constructor(selector, handleFormSubmit) {
    super(selector);
    this._popupForm = this.getPopup().querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }
}
