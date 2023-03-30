import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector, image, signature) {
    super(selector);
    this._image = image;
    this._signature = signature;
  }

  open = () => {
    const popupImage = this.getPopup.querySelector('.popup__image');
    const popupSignature = this.getPopup.querySelector('.popup__signature');
    popupImage.src = this._image;
    popupImage.alt = `Фото ${this._signature}`;
    popupSignature.textContent = this._signature;
  }
}
