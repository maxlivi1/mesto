class Card {
  constructor(data, templateSelector, options, openImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._options = options;
    this._openImage = openImage;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector(this._options.cardSelector)
    .cloneNode(true);

    return cardElement;
  }

  _getFilledPopupFullSizeImage() {
    const popup = document.querySelector(this._options.popupSelector);
    const popupImage = popup.querySelector(this._options.popupImageSelector);
    const popupSignature = popup.querySelector(this._options.popupSignatureSelector);

    popupImage.src = this._link;
    popupImage.alt = `Фото ${this._name}`;
    popupSignature.textContent = this._name;

    return popup;
  }

  _makeLike = (event) => {
    event.target.classList.toggle(this._options.buttonLikeActiveClass);
  }

  _removeCard = (event) => {
    event.preventDefault();
    this._element.remove();
  }

  _handleRemoveCard = (event) => {
    event.preventDefault();
    this._removeCard();
  }

  _handleOpenFullSizeImage = (event) => {
    event.preventDefault();
    this._openImage(this._getFilledPopupFullSizeImage());
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

function fillCardGallery(dataCards, templateSelector, dataOptions, openImageFunction) {

  const container = document.querySelector(dataOptions.cardContainerSelector);
  container.innerHTML = '';

  dataCards.forEach(dataCard => {
    const card = new Card(dataCard, templateSelector, dataOptions, openImageFunction);
    container.prepend(card.createCard());
  });
};

const cssOptions = {
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

export { Card, fillCardGallery, cssOptions as cardCssOptions };
