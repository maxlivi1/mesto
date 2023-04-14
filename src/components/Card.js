export default class Card {

  constructor({ data, userId }, { handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector, options) {
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

  isLiked() {
    let isLiked = false;
    this._likes.forEach(user => {
      if(user._id === this._userId) {
        isLiked = true;
      }
    })
    return isLiked;
  }

  _like = () => {
    this._handleLikeClick(this);
  }

  setLikes(likes) {
    this._likes = likes;
    if (this.isLiked()) {
      this._buttonLikeElement.classList.add(this._options.buttonLikeActiveClass);
    } else {
      this._buttonLikeElement.classList.remove(this._options.buttonLikeActiveClass);
    }
    this._counterLikesElemtnt.textContent = this._likes.length;
  }

  _isOwner() {
    return this._userId === this._ownerId;
  }

  _removeCard = () => {
    this._handleDeleteClick({ id: this._id, element: this._element });
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener('click', this._like);
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
    this._counterLikesElemtnt = this._element.querySelector(this._options.buttonCounterLikesSelector);

    this._nameElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = `Фото ${this._name}`;
    this._counterLikesElemtnt.textContent = this._likes.length;

    if (this.isLiked()) {
      this._buttonLikeElement.classList.add(this._options.buttonLikeActiveClass);
    }

    this._setEventListeners();

    return this._element;
  }
}
