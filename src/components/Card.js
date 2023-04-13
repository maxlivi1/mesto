export default class Card {

  constructor({ data, userId }, { handleCardClick, handleDeleteClick }, templateSelector, options) {
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick,
    this._handleDeleteClick = handleDeleteClick,
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

  _isOwner() {
    return this._userId === this._ownerId;
  }

  _removeCard = () => {
    this._handleDeleteClick({ id: this._id, element: this._element });
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener('click', this._makeLike);
    if (this._isOwner()) {
      this._buttonDeleteElement.addEventListener('click', this._removeCard);
    }
    this._imageElement.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleCardClick({
        imageSrc: this._link,
        signatureText: this._name
      });
    });
  }

  getId() {
    return this._id;
  }

  getCardInfo() {
    return {
      id: this._id,
      name: this._name,
      link: this._link,
      ownerId: this._ownerId
    }
  }

  createCard() {
    this._element = this._getTemplate();
    this._buttonLikeElement = this._element.querySelector(this._options.buttonLikeSelector);
    this._buttonDeleteElement = this._element.querySelector(this._options.buttonDeleteSelector);
    if (this._isOwner()) {
      this._buttonDeleteElement.classList.add(this._options.buttonDeleteActiveClass);
    }
    this._imageElement = this._element.querySelector(this._options.cardImageSelector);
    this._nameElement = this._element.querySelector(this._options.cardNameSelector);

    this._nameElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = `Фото ${this._name}`;

    this._setEventListeners();

    return this._element;
  }
}
