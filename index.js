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

let profileName = document.querySelector('#profile-name');
let profileInfo = document.querySelector('#profile-info');

let editForm = document.querySelector('#edit-form');
let editFormName = editForm.querySelector('#edit-form__name');
let editFormInfo = editForm.querySelector('#edit-form__information');
let popupEdit = document.querySelector('#popup-edit');

let addForm = document.querySelector('#add-form');
let addFormName = addForm.querySelector('#add-form__name');
let addFormLink = addForm.querySelector('#add-form__link');
let popupAdd = document.querySelector('#popup-add');

let buttonEditClose = document.querySelector('#form-edit__btn-close');
let buttonAddClose = document.querySelector('#form-add__btn-close');
let buttonFormSave = document.querySelector('#edit-form__btn-save');
let buttonFormOpen = document.querySelector('#button_open-form');
let buttonAdd = document.querySelector('#button_add');

function openFormEdit() {
  editFormName.value = profileName.textContent;
  editFormInfo.value = profileInfo.textContent;
  popupEdit.classList.add('popup_opened');
}

function closeFormEdit() {
  popupEdit.classList.remove('popup_opened');
  editFormName.value = '';
  editFormInfo.value = '';
}

function openFormAdd() {
  popupAdd.classList.add('popup_opened');
}

function closeFormAdd() {
  popupAdd.classList.remove('popup_opened');
  addFormName.value = '';
  addFormLink.value = '';
}

function saveFormEdit(evt) {
  evt.preventDefault();
  profileName.textContent = editFormName.value.trim();
  profileInfo.textContent = editFormInfo.value.trim();
  closeFormEdit();
}

buttonFormOpen.addEventListener('click', openFormEdit);
buttonEditClose.addEventListener('click', closeFormEdit);
editForm.addEventListener('submit', saveFormEdit);

  // вытаскиваем контент из шаблона
const placeCardTemplate = document.querySelector('#place-card').content;
const placesCards = document.querySelector('.places');

initialCards.forEach((item) => {
  // клонируем содержимое тега template
  const placeCardElement = placeCardTemplate.querySelector('.place').cloneNode(true);

  // наполняем содержимым
  placeCardElement.querySelector('.place__photo').src = item.link;
  placeCardElement.querySelector('.place__photo').alt = 'Фото ' + item.name;
  placeCardElement.querySelector('.place__name').textContent = item.name;

  // добавляем слушателя к кнопке лайк
  addListenerForLike(placeCardElement.querySelector('.place__btn-like'));

  // отображаем на странице
  placesCards.append(placeCardElement);
});

function addNewPlace(evt) {
  evt.preventDefault();

  // код для добавление карточки места

  // клонируем содержимое тега template
  const placeCardElement = placeCardTemplate.querySelector('.place').cloneNode(true);

  // наполняем содержимым
  placeCardElement.querySelector('.place__photo').src = addFormLink.value.trim();
  placeCardElement.querySelector('.place__photo').alt = 'Фото ' + addFormLink.value.trim();
  placeCardElement.querySelector('.place__name').textContent = addFormName.value.trim();

  // добавляем слушателя к кнопке лайк
  addListenerForLike(placeCardElement.querySelector('.place__btn-like'));

  // отображаем карточку на странице, в начале списка
  placesCards.prepend(placeCardElement);
  // конец

  closeFormAdd();
}

buttonAdd.addEventListener('click', openFormAdd);
buttonAddClose.addEventListener('click', closeFormAdd);
addForm.addEventListener('submit', addNewPlace);

function makeLike(event) {
  event.target.classList.toggle('place__btn-like_active');
}

function addListenerForLike (button) {
  button.addEventListener('click', makeLike);
}
