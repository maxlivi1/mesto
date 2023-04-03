export default class Popup {

  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
    this._popupOpenClass = 'popup_opened';
    this._buttonCloseSelector = '.popup__btn-close';
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleOwerlayClose = (event) => {
    if (event.currentTarget === event.target) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector(this._buttonCloseSelector).addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._handleOwerlayClose);
  }

  getPopup = () => this._popup;

  open() {
    this._popup.classList.add(this._popupOpenClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._popupOpenClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
