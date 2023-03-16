import { openPopup } from './index.js';

class Card {
  constructor(data, cssOptions) {
    this._name = data.name;
    this._link = data.link;
    this._cssOptions = cssOptions;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cssOptions.templateSelector)
    .content.querySelector(this._cssOptions.cardSelector)
    .cloneNode(true);

    return cardElement;
  }

  _makeLike(event) {
    event.target.classList.toggle(this._cssOptions.buttonLikeActiveClass);
  }

  _removeCard() {
    this._element.remove();
  }

  _getFilledPopupFullSizeImage() {
    const popup = document.querySelector(this._cssOptions.popupSelector);
    const popupImage = popup.querySelector(this._cssOptions.popupImageSelector);
    const popupSignature = popup.querySelector(this._cssOptions.popupSignatureSelector);

    popupImage.src = this._link;
    popupImage.alt = `Фото ${this._name}`;
    popupSignature.textContent = this._name;

    return popup;
  }

  _setEventListeners() {
    this._element.querySelector(this._cssOptions.buttonLikeSelector).addEventListener('click', (event) => {
      this._makeLike(event);
    });
    this._element.querySelector(this._cssOptions.buttonDeleteSelector).addEventListener('click', () => {
      this._removeCard();
    });
    this._element.querySelector(this._cssOptions.cardImageSelector).addEventListener('click', (event) => {
      event.preventDefault();
      openPopup(this._getFilledPopupFullSizeImage());
    });
  }

  _createCard() {
    this._element = this._getTemplate();

    this._element.querySelector(this._cssOptions.cardNameSelector).textContent = this._name;
    this._element.querySelector(this._cssOptions.cardImageSelector).src = this._link;
    this._element.querySelector(this._cssOptions.cardImageSelector).alt = `Фото ${this._name}`;

    this._setEventListeners();

    return this._element;
  }

  prependCard() {
    document.querySelector(this._cssOptions.cardContainerSelector).prepend(this._createCard());
    return this._element;
  }
}

function fillCardGallery(dataCards, dataCssOptions) {
  dataCards.forEach(dataCard => {
    const card = new Card(dataCard, dataCssOptions);
    card.prependCard();
  });
};

const cardCssOptions = {
  templateSelector: '#place-card',
  cardSelector: '.place',
  cardNameSelector: '.place__name',
  cardImageSelector: '.place__photo',
  cardContainerSelector: '.places',
  buttonDeleteSelector: '.place__btn-delete',
  buttonLikeSelector: '.place__btn-like',
  buttonLikeActiveClass: 'place__btn-like_active',

  popupSelector: '.popup_place_image',
  popupImageSelector: '.popup__image',
  popupSignatureSelector: '.popup__signature',
};

export { Card, fillCardGallery, cardCssOptions };
