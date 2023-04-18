export const cardCssOptions = {
  cardNameSelector: '.place__name',
  cardImageSelector: '.place__photo',
  buttonDeleteSelector: '.place__btn-delete',
  buttonLikeSelector: '.place__btn-like',
  buttonCounterLikesSelector: '.place__like-counter',
  buttonDeleteActiveClass: 'place__btn-delete_active',
  buttonLikeActiveClass: 'place__btn-like_active',
};

export const validatorConfig = {
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  inputErrorPostfix: '-error',
};

export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'c6eeac48-21b1-4b11-8e1a-276b18a235ea',
    'Content-Type': 'application/json'
  },
  requestTo: {
    user: '/users/me',
    userAvatar: '/users/me/avatar',
    places: '/cards',
    likes: '/likes'
  }
};

export const buttonOpenPopupEditProfile = document.querySelector('#button_open-form');
export const buttonOpenPopupAddNewPlace = document.querySelector('#add-place-btn');

