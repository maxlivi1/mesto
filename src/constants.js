const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

  const cardCssOptions = {
    cardSelector: '.place',
    cardNameSelector: '.place__name',
    cardImageSelector: '.place__photo',
    cardContainerSelector: '.places',
    buttonDeleteSelector: '.place__btn-delete',
    buttonLikeSelector: '.place__btn-like',
    buttonLikeActiveClass: 'place__btn-like_active',
  };

  const validatorConfig = {
    inputSelector: '.popup__input',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
    inputErrorPostfix: '-error',
  };

  export { initialCards, cardCssOptions, validatorConfig };
