export default class Card {

  constructor({ data, handleCardClick }, templateSelector, options) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick,
    this._templateSelector = templateSelector;
    this._options = options;
  }

  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .children[0]
    .cloneNode(true);
  }

  _makeLike = () => {
    this._buttonLikeElement.classList.toggle(this._options.buttonLikeActiveClass);
  }

  _removeCard = () => {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener('click', this._makeLike);
    this._buttonDeleteElement.addEventListener('click', this._removeCard);
    this._imageElement.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleCardClick({
        imageSrc: this._link,
        signatureText: this._name
      });
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._buttonLikeElement = this._element.querySelector(this._options.buttonLikeSelector);
    this._buttonDeleteElement = this._element.querySelector(this._options.buttonDeleteSelector);
    this._imageElement = this._element.querySelector(this._options.cardImageSelector);
    this._nameElement = this._element.querySelector(this._options.cardNameSelector);

    this._nameElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = `Фото ${this._name}`;

    this._setEventListeners();

    return this._element;
  }
}
