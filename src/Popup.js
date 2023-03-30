export default class Popup {

  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
    this._popupOpenClass = 'popup_opened';
    this._buttonCloseSelector = '.popup__btn-close';
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this._popup.close();
    }
  }

  getPopup = () => this._popup;

  open = () => {
    this._popup.classList.add(this._popupOpenClass);
    this._popup.addEventListener('keydown', this._handleEscClose);
  }

  close = () => {
    this._popup.classList.remove(this._popupOpenClass);
    this._popup.removeEventListener('keydown', this._handleEscClose);
  }

  _handleOwerlayClose = (event) => {
    if (event.currentTarget === event.target) {
      this._popup.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector(this._buttonCloseSelector).addEventListener('click', this.close);
    this._popup.addEventListener('click', this._handleOwerlayClose);
  }
}
