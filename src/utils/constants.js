export const cardCssOptions = {
  cardNameSelector: '.place__name',
  cardImageSelector: '.place__photo',
  buttonDeleteSelector: '.place__btn-delete',
  buttonLikeSelector: '.place__btn-like',
  buttonLikeActiveClass: 'place__btn-like_active',
};

export const validatorConfig = {
  inputSelector: '.popup__input',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  inputErrorPostfix: '-error',
};

export const buttonOpenPopupEditProfile = document.querySelector('#button_open-form');
export const buttonOpenPopupAddNewPlace = document.querySelector('#add-place-btn');

