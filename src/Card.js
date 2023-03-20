import { getImagePopup } from './imagePopup.js';

export class Card {
  constructor(data, templateSelector, options, openImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._options = options;
    this._openImage = openImage;
  }

  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .children[0]
    .cloneNode(true);
  }

  _makeLike = (event) => {
    event.target.classList.toggle(this._options.buttonLikeActiveClass);
  }

  _removeCard = () => {
    this._element.remove();
  }

  _handleOpenFullSizeImage = (event) => {
    event.preventDefault();
    this._openImage(getImagePopup(this._link, this._name));
  }

  _setEventListeners() {
    this._element.querySelector(this._options.buttonLikeSelector).addEventListener('click', this._makeLike);
    this._element.querySelector(this._options.buttonDeleteSelector).addEventListener('click', this._removeCard);
    this._element.querySelector(this._options.cardImageSelector).addEventListener('click', this._handleOpenFullSizeImage);
  }

  createCard() {
    this._element = this._getTemplate();

    this._element.querySelector(this._options.cardNameSelector).textContent = this._name;
    this._element.querySelector(this._options.cardImageSelector).src = this._link;
    this._element.querySelector(this._options.cardImageSelector).alt = `Фото ${this._name}`;

    this._setEventListeners();

    return this._element;
  }
}
