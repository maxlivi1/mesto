import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(selector) {
    super(selector);
    this._popupImage = this.getPopup().querySelector('.popup__image');
    this._popupSignature = this.getPopup().querySelector('.popup__signature');
  }

  open({ imageSrc, signatureText }) {
    this._popupImage.src = imageSrc;
    this._popupImage.alt = `Фото ${signatureText}`;
    this._popupSignature.textContent = signatureText;
    super.open();
  }

  close() {
    super.close();
    this._popupImage.src = '';
    this._popupImage.alt = '';
    this._popupSignature.textContent = '';
  }
}
