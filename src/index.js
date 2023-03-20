import { initialCards, cardCssOptions, validatorConfig } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const places = document.querySelector('.places');

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

const formEditProfileValidator = new FormValidator(validatorConfig, formEditProfile);
formEditProfileValidator.enableValidation();
const formAddNewPlaceValidator = new FormValidator(validatorConfig, formAddNewPlace);
formAddNewPlaceValidator.enableValidation();


function handleClosePopupWithEscape(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup (popup) {
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

  formEditProfileValidator.resetValidation();
}

function openPopupAddNewPlace() {
  openPopup(popupAddNewPlace);

  formAddNewPlace.reset();

  formAddNewPlaceValidator.resetValidation();
}

function generatePlaceCard(dataCard, templateSelector, dataOptions, openImageFunction) {
  return new Card(dataCard, templateSelector, dataOptions, openImageFunction).createCard();
}

function addPlaceCard() {
  places.prepend(generatePlaceCard({
    name: formAddNewPlaceName.value,
    link: formAddNewPlaceImageSrc.value,
  }, '#place-card', cardCssOptions, openPopup));
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

function fillCardGallery(dataCards, templateSelector, container, dataOptions, openImageFunction) {
  container.innerHTML = '';
  dataCards.forEach(dataCard => {
    container.prepend(generatePlaceCard(dataCard, templateSelector, dataOptions, openImageFunction));
  });
};

fillCardGallery(initialCards, '#place-card', places, cardCssOptions, openPopup);

