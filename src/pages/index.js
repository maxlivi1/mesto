import './index.css';
import '../../README.md';
import {
  cardCssOptions,
  validatorConfig,
  buttonOpenPopupEditProfile,
  buttonOpenPopupAddNewPlace,
  apiOptions
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConsentToDeletion from '../components/PopupConsentToDeletion.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

const api = new Api(apiOptions);
let user = null;

const popupDeletePlace = new PopupConsentToDeletion('#popup-delete-place', () => {
  const deletionObject = popupDeletePlace.getDeletionObject();
  api.deletePlace({ placeId: deletionObject.id })
  .then(() => {
    deletionObject.element.remove();
    popupDeletePlace.close();
  })
  .catch(error => {
    console.log(`Что-то пошло не так: ${error}`);
  })
});
popupDeletePlace.setEventListeners();

const popupChangeAvatar = new PopupWithForm('#popup-change-avatar', (inputData => {
  popupChangeAvatar.switchButtonText('Сохранение...');
  api.updateUserAvatar({ newAvatar: inputData['change-avatar__link'] })
  .then(userData => {
    user.setUserAvatar({ newAvatar: userData.avatar });
    popupChangeAvatar.close();
  })
  .catch(error => {
    console.log(`Что-то пошло не так: ${error}`);
  })
  .finally(() => {
    popupChangeAvatar.switchButtonText('Сохранить');
  })
}));
popupChangeAvatar.setEventListeners();
const formChangeAvatarValidator = new FormValidator(validatorConfig, popupChangeAvatar.getForm());
formChangeAvatarValidator.enableValidation();

const popupImage = new PopupWithImage('#popup-image');
popupImage.setEventListeners();

function handleCardClick({ imageSrc, signatureText }) {
  popupImage.open({ imageSrc, signatureText });
}

function generateCard(dataCard, userId, handleCard, handleDelete, handleLike, selector, options) {
  const card = new Card(
    { data: dataCard, userId },
    { handleCardClick: handleCard, handleDeleteClick: handleDelete, handleLikeClick: handleLike },
    selector, options);
  return card.createCard();
}

function handleDeleteClick(deletionObject) {
  popupDeletePlace.open(deletionObject);
}

function handleLikeClick(place) {
  api.likePlace({ isLiked: place.isLiked(), placeId: place.getId() })
  .then((resData) => {
    place.setLikes(resData.likes);
  })
  .catch(error => {
    console.log(`Что-то пошло не так: ${error}`);
  })
}

const cardsSectionRenderer = new Section({
  renderer: (item) => {
    cardsSectionRenderer.addItem(generateCard(item, user.getId(), handleCardClick, handleDeleteClick, handleLikeClick, '#place-card', cardCssOptions));
  }
}, '.places');

const popupAddPlace = new PopupWithForm('#popup-add', (inputsData) => {
  popupAddPlace.switchButtonText('Сохранение...');
  api.createPlace(
    { placeName: inputsData['add-form__name'],
      imageUrl: inputsData['add-form__link']
    })
    .then(resData => {
      cardsSectionRenderer.addItem(generateCard(resData, user.getId(), handleCardClick, handleDeleteClick, handleLikeClick, '#place-card', cardCssOptions));
      popupAddPlace.close();
    })
    .catch(error => {
      console.log(`Что-то пошло не так: ${error}`);
    })
    .finally(() => {
      popupAddPlace.switchButtonText('Создать');
    })
});
popupAddPlace.setEventListeners();
const formAddNewPlaceValidator = new FormValidator(validatorConfig, popupAddPlace.getForm());
formAddNewPlaceValidator.enableValidation();

function handleOpenPopupAddPlace(event) {
  event.preventDefault();
  formAddNewPlaceValidator.resetValidation();
  popupAddPlace.open();
}

buttonOpenPopupAddNewPlace.addEventListener('click', handleOpenPopupAddPlace);

const popupEditUserInfo = new PopupWithForm('#popup-edit', (inputsData) => {
  popupEditUserInfo.switchButtonText('Сохранение...');
  api.updateUserInfo(
    {
    newName: inputsData['name'],
    newInfo: inputsData['about'],
    })
    .then(userData => {
      user.setUserInfo({
        newName: userData.name,
        newInfo: userData.about,
      });
      popupEditUserInfo.close();
    })
    .catch(error => {
      console.log(`Что-то пошло не так: ${error}`);
    })
    .finally(() => {
      popupEditUserInfo.switchButtonText('Сохранить');
    })
});
popupEditUserInfo.setEventListeners();
const formEditProfileValidator = new FormValidator(validatorConfig, popupEditUserInfo.getForm());
formEditProfileValidator.enableValidation();

function handleOpenPopupProfile(event) {
  event.preventDefault();

  popupEditUserInfo.setInputValues(user.getUserInfo());

  formEditProfileValidator.resetValidation();
  popupEditUserInfo.open();
}

buttonOpenPopupEditProfile.addEventListener('click', handleOpenPopupProfile);

Promise.all([api.getUser(), api.getInitialPlaces()])
.then(([userData, cardsData]) => {
  user = new UserInfo({
    userAvatarSelector: '.profile__avatar',
    userNameSelector: '#profile-name',
    userInfoSelector: '#profile-info',
    userAvatarChangeButtonSelector: '.profile__btn-change'
  },
  {
    id: userData._id,
    name: userData.name,
    about: userData.about,
    avatar: userData.avatar
  },
  () => {
    formChangeAvatarValidator.resetValidation();
    popupChangeAvatar.open();
  });
  user.setListeners();
  user.renderUserInfo();

  cardsSectionRenderer.rendereItems({ items: cardsData.reverse() });
})
.catch(error => {
  console.log(`Что-то пошло не так: ${error}`);
})
