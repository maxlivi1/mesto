import { initialCards } from './constants.js';
import { Card, fillCardGallery, cardCssOptions } from './Card.js';
import { FormValidator, validatorConfig } from './FormValidator.js';

const profileName = document.querySelector('#profile-name');
const profileInfo = document.querySelector('#profile-info');

const popupEditProfile = document.querySelector('#popup-edit');
const popupAddNewPlace = document.querySelector('#popup-add');
const popupOpenFullSizeImage = document.querySelector('#popup-image');

const formEditProfile = document.querySelector('#edit-form');
const formEditProfileName = formEditProfile.querySelector('#edit-form-name');
const formEditProfileInfo = formEditProfile.querySelector('#edit-form-information');

const formAddNewPlace = document.querySelector('#add-form');
const formAddNewPlaceName = formAddNewPlace.querySelector('#add-form-name');
const formAddNewPlaceImageSrc = formAddNewPlace.querySelector('#add-form-link');

const buttonOpenPopupEditProfile = document.querySelector('#button_open-form');
const buttonOpenPopupAddNewPlace = document.querySelector('#add-place-btn');

function handleClosePopupWithEscape(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

 export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupWithEscape);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupWithEscape);
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);

  formEditProfileName.value = profileName.textContent;
  formEditProfileInfo.value = profileInfo.textContent;

  new FormValidator(validatorConfig,formEditProfile).enableValidation();
}

function openPopupAddNewPlace() {
  openPopup(popupAddNewPlace);

  formAddNewPlace.reset();

  new FormValidator(validatorConfig,formAddNewPlace).enableValidation();
}

function addPlaceCard() {
  const card = new Card({
    name: formAddNewPlaceName.value,
    link: formAddNewPlaceImageSrc.value,
  }, '#place-card', cardCssOptions);

  const container = document.querySelector(cardCssOptions.cardContainerSelector);
  container.prepend(card.createCard());
}

function handleOpenPopupEditProfile(event) {
  event.preventDefault();
  openPopupEditProfile();
}

function handleOpenPopupAddNewPlace(event) {
  event.preventDefault();
  openPopupAddNewPlace();
}

function handleSubmitFormSaveProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = formEditProfileName.value.trim();
  profileInfo.textContent = formEditProfileInfo.value.trim();
  closePopup(popupEditProfile);
}

function handleSubmitFormAddNewPlace (event) {
  event.preventDefault();
  addPlaceCard();
  closePopup(popupAddNewPlace);
  formAddNewPlace.reset();
}

function handlePopupClose (event) {
  const currentTarget = event.currentTarget;
  const target = event.target;

  if ((currentTarget.classList.contains('popup_opened') && (currentTarget === target)) || target.classList.contains('popup__btn-close')) {
    closePopup(currentTarget);
  }
}

popupEditProfile.addEventListener('click', handlePopupClose);
popupAddNewPlace.addEventListener('click', handlePopupClose);
popupOpenFullSizeImage.addEventListener('click', handlePopupClose);

formEditProfile.addEventListener('submit', handleSubmitFormSaveProfileInfo);
formAddNewPlace.addEventListener('submit', handleSubmitFormAddNewPlace);

buttonOpenPopupAddNewPlace.addEventListener('click', handleOpenPopupAddNewPlace);
buttonOpenPopupEditProfile.addEventListener('click', handleOpenPopupEditProfile);

fillCardGallery(initialCards, '#place-card', cardCssOptions);
