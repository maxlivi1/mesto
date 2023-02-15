const profileName = document.querySelector('#profile-name');
const profileInfo = document.querySelector('#profile-info');

const popupEditProfile = document.querySelector('#popup-edit');
const popupAddNewPlace = document.querySelector('#popup-add');
const popupOpenFullSizeImage = document.querySelector('#popup-image');

const fullSizeImage = popupOpenFullSizeImage.querySelector('.popup__image');
const signatureForFullSizeImage = popupOpenFullSizeImage.querySelector('.popup__signature');

const formEditProfile = document.querySelector('#edit-form');
const formEditProfileName = formEditProfile.querySelector('#edit-form__name');
const formEditProfileInfo = formEditProfile.querySelector('#edit-form__information');

const formAddNewPlace = document.querySelector('#add-form');
const formAddNewPlaceName = formAddNewPlace.querySelector('#add-form__name');
const formAddNewPlaceImageSrc = formAddNewPlace.querySelector('#add-form__link');

const buttonClosePopupEditProfile = document.querySelector('#form-edit__btn-close');
const buttonClosePopupAddNewPlace = document.querySelector('#form-add__btn-close');
const buttonClosePopupOpenFullSizeImage = document.querySelector('#form-image__btn-close');
const buttonOpenPopupEditProfile = document.querySelector('#button_open-form');
const buttonOpenPopupAddNewPlace = document.querySelector('#add-place-btn');

const placesCards = document.querySelector('.places');

const placeCardTemplate = document.querySelector('#place-card').content;

function openPopup (popup) {
  popup.classList.add('popup_opened');

  if (popup === popupEditProfile) {
    formEditProfileName.value = profileName.textContent;
    formEditProfileInfo.value = profileInfo.textContent;
  }
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');

  if (popup === popupAddNewPlace) {
    formAddNewPlace.reset();
  }
}

function openPopupFullSizeImage (event) {
  event.preventDefault();
  const place = event.target.closest('.place');
  const placePhoto = place.querySelector('.place__photo');
  const placeName = place.querySelector('.place__name');
  fullSizeImage.src = placePhoto.src;
  fullSizeImage.alt = placePhoto.alt;
  signatureForFullSizeImage.textContent = placeName.textContent;
  openPopup (popupOpenFullSizeImage);
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
  place.classList.add('place_condition_hide');
  setTimeout(() => {
    place.remove();
  }, animationTime);
}

buttonOpenPopupEditProfile.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup(popupEditProfile);
});

buttonClosePopupEditProfile.addEventListener('click', (e) => {
  e.preventDefault();
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', saveProfileInfo);

buttonOpenPopupAddNewPlace.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup(popupAddNewPlace);
});

buttonClosePopupAddNewPlace.addEventListener('click', (e) => {
  e.preventDefault();
  closePopup(popupAddNewPlace);
});

formAddNewPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  addPlaceCard(formAddNewPlaceName.value, formAddNewPlaceImageSrc.value, true);
});

buttonClosePopupOpenFullSizeImage.addEventListener('click', (e) => {
  e.preventDefault();
  closePopup(popupOpenFullSizeImage);
});

function createPlaceCard(name, imgSrc) {

  const placeCard = placeCardTemplate.querySelector('.place').cloneNode(true);

  const placePhoto = placeCard.querySelector('.place__photo');
  const placeName = placeCard.querySelector('.place__name');

  placePhoto.src = imgSrc.trim();
  placePhoto.alt = 'Фото ' + name.trim();
  placeName.textContent = name.trim();

  return placeCard;
}

function addPlaceCard(name, imgSrc, isNew) {
  placesCards.prepend(createPlaceCard(name, imgSrc));
  if (isNew) {
    closePopup(popupAddNewPlace);
  }
}

placesCards.addEventListener('click', (e) => {
  const classes = e.target.classList;

  if (classes.contains('place__btn-like')) {
    makeLike(e);
  } else if (classes.contains('place__btn-delete')) {
    deletePlace(e);
  } else if (classes.contains('place__photo')) {
    openPopupFullSizeImage(e);
  }
});

initialCards.forEach((item) => {
  addPlaceCard(item.name, item.link, false);
});
