import './index.css';
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

const popupImage = new PopupWithImage('#popup-image');
popupImage.setEventListeners();

function handleCardClick({ imageSrc, signatureText }) {
  popupImage.open({ imageSrc, signatureText });
}

function generateCard(dataCard,handleCard, selector, options) {
  return new Card({ data: dataCard, handleCardClick: handleCard }, selector, options).createCard();
}

const cardsSectionRenderer = new Section({
  renderer: (item) => {
    cardsSectionRenderer.addItem(generateCard(item, handleCardClick, '#place-card', cardCssOptions));
  }
}, '.places');

function handleSubmitAddPlace(inputsData) {
  cardsSectionRenderer.addItem(
    generateCard(
      {
        name: inputsData['add-form__name'],
        link: inputsData['add-form__link'],
      },
      handleCardClick, '#place-card', cardCssOptions));
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

  const { name, info } = userInfo.getUserInfo();
  const formElements = popupEdit.getForm().elements;

  formElements['edit-form__name'].value = name;
  formElements['edit-form__information'].value = info;

  formEditProfileValidator.resetValidation();
  popupEdit.open();
}

buttonOpenPopupEditProfile.addEventListener('click', handleOpenPopupProfile);

cardsSectionRenderer.rendereItems({ items: initialCards });
