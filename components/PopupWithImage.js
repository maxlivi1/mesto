import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, image = '', signature = '') {
    super(selector);
    this._image = image;
    this._signature = signature;
    this._popupImage = this.getPopup().querySelector('.popup__image');
    this._popupSignature = this.getPopup().querySelector('.popup__signature');
  }

  open() {
    super.open();
    this._popupImage.src = this._image;
    this._popupImage.alt = `Фото ${this._signature}`;
    this._popupSignature.textContent = this._signature;
  }
}
