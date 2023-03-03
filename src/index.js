const profileName = document.querySelector('#profile-name');
const profileInfo = document.querySelector('#profile-info');

const popupEditProfile = document.querySelector('#popup-edit');
const popupAddNewPlace = document.querySelector('#popup-add');
const popupOpenFullSizeImage = document.querySelector('#popup-image');

const fullSizeImage = popupOpenFullSizeImage.querySelector('.popup__image');
const signatureForFullSizeImage = popupOpenFullSizeImage.querySelector('.popup__signature');

const formEditProfile = document.querySelector('#edit-form');
const formEditProfileName = formEditProfile.querySelector('#edit-form-name');
const formEditProfileInfo = formEditProfile.querySelector('#edit-form-information');

const formAddNewPlace = document.querySelector('#add-form');
const formAddNewPlaceName = formAddNewPlace.querySelector('#add-form-name');
const formAddNewPlaceImageSrc = formAddNewPlace.querySelector('#add-form-link');

const buttonClosePopupEditProfile = document.querySelector('#form-edit__btn-close');
const buttonClosePopupAddNewPlace = document.querySelector('#form-add__btn-close');
const buttonClosePopupOpenFullSizeImage = document.querySelector('#form-image__btn-close');
const buttonOpenPopupEditProfile = document.querySelector('#button_open-form');
const buttonOpenPopupAddNewPlace = document.querySelector('#add-place-btn');

const placesCards = document.querySelector('.places');

const placeCardTemplate = document.querySelector('#place-card').content;

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function handleClosePopupWithEscape(event) {
  if (event.key === 'Escape' && popupEditProfile.classList.contains('popup_opened')) {
    closePopup(popupEditProfile);
    formEditProfileName.removeEventListener('keydown', handleClosePopupWithEscape);
    formEditProfileInfo.removeEventListener('keydown', handleClosePopupWithEscape);
  } else if (event.key === 'Escape' && popupAddNewPlace.classList.contains('popup_opened')) {
    closePopup(popupAddNewPlace);
    formAddNewPlaceName.removeEventListener('keydown', handleClosePopupWithEscape);
    formAddNewPlaceImageSrc.removeEventListener('keydown', handleClosePopupWithEscape);
  } else if (event.key === 'Escape' && popupOpenFullSizeImage.classList.contains('popup_opened')) {
    closePopup(popupOpenFullSizeImage);
  }
  document.removeEventListener('keydown', handleClosePopupWithEscape);
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);

  formEditProfileName.value = profileName.textContent;
  formEditProfileInfo.value = profileInfo.textContent;

  // функция из пакета validate.js (обрабатывает валидацию полей и сабмита при открытии попапа)
  resetValidation(popupEditProfile, config);

  document.addEventListener('keydown', handleClosePopupWithEscape);
  formEditProfileName.addEventListener('keydown', handleClosePopupWithEscape);
  formEditProfileInfo.addEventListener('keydown', handleClosePopupWithEscape);
}

function openPopupAddNewPlace() {
  openPopup(popupAddNewPlace);

  formAddNewPlace.reset();

  // функция из пакета validate.js (обрабатывает валидацию полей и сабмита при открытии попапа)
  resetValidation(popupAddNewPlace, config);

  document.addEventListener('keydown', handleClosePopupWithEscape);
  formAddNewPlaceName.addEventListener('keydown', handleClosePopupWithEscape);
  formAddNewPlaceImageSrc.addEventListener('keydown', handleClosePopupWithEscape);
}

function openPopupFullSizeImage (parentElement) {
  const placePhoto = parentElement.querySelector('.place__photo');
  const placeName = parentElement.querySelector('.place__name');
  fullSizeImage.src = placePhoto.src;
  fullSizeImage.alt = placePhoto.alt;
  signatureForFullSizeImage.textContent = placeName.textContent;
  openPopup (popupOpenFullSizeImage);

  document.addEventListener('keydown', handleClosePopupWithEscape);
}

function makeLike(event) {
  event.target.classList.toggle('place__btn-like_active');
}

function deletePlace(event) {
  const place = event.target.closest('.place');
  place.remove();
}

function handleOpenPopupEditProfile(event) {
  event.preventDefault();
  openPopupEditProfile();
}

function handleOpenPopupAddNewPlace(event) {
  event.preventDefault();
  openPopupAddNewPlace();
}

function handleOpenPopupFullSizeImage (event) {
  event.preventDefault();
  openPopupFullSizeImage(event.target.closest('.place'));
}

function handleSubmitFormSaveProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = formEditProfileName.value.trim();
  profileInfo.textContent = formEditProfileInfo.value.trim();
  closePopup(popupEditProfile);
}

function handleSubmitFormAddNewPlace (event) {
  event.preventDefault();
  addPlaceCard(formAddNewPlaceName.value, formAddNewPlaceImageSrc.value);
  closePopup(popupAddNewPlace);
  formAddNewPlace.reset();
}

function handlePopupClose (event) {
  const target = event.target;

  if (target === popupAddNewPlace || target === buttonClosePopupAddNewPlace) {
    closePopup(popupAddNewPlace);
  } else if (target === popupEditProfile || target === buttonClosePopupEditProfile) {
    closePopup(popupEditProfile);
  } else if (target === popupOpenFullSizeImage || target === buttonClosePopupOpenFullSizeImage) {
    closePopup(popupOpenFullSizeImage);
  }
}

popupEditProfile.addEventListener('click', handlePopupClose);
popupAddNewPlace.addEventListener('click', handlePopupClose);
popupOpenFullSizeImage.addEventListener('click', handlePopupClose);

buttonClosePopupEditProfile.addEventListener('click', handlePopupClose);
buttonClosePopupAddNewPlace.addEventListener('click', handlePopupClose);
buttonClosePopupOpenFullSizeImage.addEventListener('click', handlePopupClose);

formEditProfile.addEventListener('submit', handleSubmitFormSaveProfileInfo);
formAddNewPlace.addEventListener('submit', handleSubmitFormAddNewPlace);

buttonOpenPopupAddNewPlace.addEventListener('click', handleOpenPopupAddNewPlace);
buttonOpenPopupEditProfile.addEventListener('click', handleOpenPopupEditProfile);

function createPlaceCard(name, imgSrc) {

  const placeCard = placeCardTemplate.querySelector('.place').cloneNode(true);

  const placePhoto = placeCard.querySelector('.place__photo');
  const placeName = placeCard.querySelector('.place__name');

  placePhoto.src = imgSrc.trim();
  placePhoto.alt = 'Фото ' + name.trim();
  placeName.textContent = name.trim();

  const buttonLike = placeCard.querySelector('.place__btn-like');
  const buttonDelete = placeCard.querySelector('.place__btn-delete');
  const buttonOpenImage = placeCard.querySelector('.place__photo');

  buttonLike.addEventListener('click', makeLike);
  buttonDelete.addEventListener('click', deletePlace);
  buttonOpenImage.addEventListener('click', handleOpenPopupFullSizeImage);

  return placeCard;
}

function addPlaceCard(name, imgSrc) {
  placesCards.prepend(createPlaceCard(name, imgSrc));
}

initialCards.forEach((item) => {
  addPlaceCard(item.name, item.link, false);
});
