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

function makeLike(event) {
  event.target.classList.toggle('place__btn-like_active');
}

function saveProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = formEditProfileName.value.trim();
  profileInfo.textContent = formEditProfileInfo.value.trim();
  closePopup(popupEditProfile);
}

function deletePlace(event) {
  const place = event.target.closest('.place');
  place.remove();
}

function handleOpenPopupFullSizeImage (event) {
  event.preventDefault();
  const place = event.target.closest('.place');
  const placePhoto = place.querySelector('.place__photo');
  const placeName = place.querySelector('.place__name');
  fullSizeImage.src = placePhoto.src;
  fullSizeImage.alt = placePhoto.alt;
  signatureForFullSizeImage.textContent = placeName.textContent;
  openPopup (popupOpenFullSizeImage);
}

function handleOpenPopupEditProfile(event) {
  event.preventDefault();
  openPopup(popupEditProfile);

  formEditProfileName.value = profileName.textContent;
  formEditProfileInfo.value = profileInfo.textContent;

  // функция из пакета validate.js (обрабатывает валидацию полей и сабмита при открытии попапа)
  resetValidation(popupEditProfile, config);
}

function handleOpenPopupAddNewPlace(event) {
  event.preventDefault();
  openPopup(popupAddNewPlace);

  // функция из пакета validate.js (обрабатывает валидацию полей и сабмита при открытии попапа)
  resetValidation(popupAddNewPlace, config);
}

function handleSubmitFormAddNewPlace (event) {
  event.preventDefault();
  addPlaceCard(formAddNewPlaceName.value, formAddNewPlaceImageSrc.value);
  closePopup(popupAddNewPlace);
  formAddNewPlace.reset();
}

function handlePopupClose (event) {
  const target = event.target;
  const key = event.key;

  if (target === popupAddNewPlace || (key === 'Escape' && popupAddNewPlace.classList.contains('popup_opened')) || target === buttonClosePopupAddNewPlace) {
    closePopup(popupAddNewPlace);
    formAddNewPlace.reset();
  } else if (target === popupEditProfile || (key === 'Escape' && popupEditProfile.classList.contains('popup_opened')) || target === buttonClosePopupEditProfile) {
    closePopup(popupEditProfile);
  } else if (target === popupOpenFullSizeImage || (key === 'Escape' && popupOpenFullSizeImage.classList.contains('popup_opened')) || target === buttonClosePopupOpenFullSizeImage) {
    closePopup(popupOpenFullSizeImage);
  }
}

document.addEventListener('click', handlePopupClose);
document.addEventListener('keydown', handlePopupClose);

formEditProfile.addEventListener('submit', saveProfileInfo);
formAddNewPlace.addEventListener('submit', handleSubmitFormAddNewPlace);

buttonClosePopupEditProfile.addEventListener('click', handlePopupClose);
buttonClosePopupAddNewPlace.addEventListener('click', handlePopupClose);
buttonClosePopupOpenFullSizeImage.addEventListener('click', handlePopupClose);

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
