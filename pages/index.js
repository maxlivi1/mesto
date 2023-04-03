import {
  initialCards,
  cardCssOptions,
  validatorConfig,
  buttonOpenPopupEditProfile,
  buttonOpenPopupAddNewPlace,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const userInfo = new UserInfo({
  userNameSelector: '#profile-name',
  userInfoSelector: '#profile-info',
});

function handleCardClick({ imageSrc, signatureText }) {
  const popup = new PopupWithImage('#popup-image', imageSrc, signatureText);
  popup.setEventListeners();
  popup.open();
}

const cardsSectionRerderer = new Section({
  items: initialCards,
  renderer: () => {}
}, '.places');

function cardRenderer(item) {
  const card = new Card({ data: item, handleCardClick }, '#place-card', cardCssOptions).createCard();
  cardsSectionRerderer.addItem(card);
}

cardsSectionRerderer.setRenderer(cardRenderer);

function handleSubmitAddPlace(inputsData) {
  cardsSectionRerderer.addItem((new Card({ data:
    {
    name: inputsData['add-form__name'],
    link: inputsData['add-form__link'],
    }, handleCardClick }, '#place-card', cardCssOptions).createCard()));
}

const popupPlace = new PopupWithForm('#popup-add', handleSubmitAddPlace);
popupPlace.setEventListeners();

const formAddNewPlaceValidator = new FormValidator(validatorConfig, popupPlace.getForm());
formAddNewPlaceValidator.enableValidation();

function handleOpenPopupAddPlace(event) {
  event.preventDefault();
  formAddNewPlaceValidator.resetValidation();
  popupPlace.open();
}

buttonOpenPopupAddNewPlace.addEventListener('click', handleOpenPopupAddPlace);

function handleSubmitUserInfo(inputsData) {
  userInfo.setUserInfo({
    newName: inputsData['edit-form__name'],
    newInfo: inputsData['edit-form__information'],
  });
}

const popupEdit = new PopupWithForm('#popup-edit', handleSubmitUserInfo);
popupEdit.setEventListeners();

const formEditProfileValidator = new FormValidator(validatorConfig, popupEdit.getForm());
formEditProfileValidator.enableValidation();

function handleOpenPopupProfile(event) {
  event.preventDefault();
  popupEdit.getForm().elements['edit-form__name'].value = userInfo.getUserInfo().name;
  popupEdit.getForm().elements['edit-form__information'].value = userInfo.getUserInfo().info;
  formEditProfileValidator.resetValidation();
  popupEdit.open();
}

buttonOpenPopupEditProfile.addEventListener('click', handleOpenPopupProfile);

cardsSectionRerderer.rendereItems();
