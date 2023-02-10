const initialCards = [
  {
  name: 'Павловск, Воронежская область',
  link: 'https://bravo-voronezh.ru/wp-content/uploads/2019/01/Pavlovsk_800_Pavlovsk-s-vysoty-ptichego-poleta.jpg'
},
{
  name: 'Воронеж',
  link: 'https://static11.tgcnt.ru/posts/_0/e8/e8086126a5058fa682aa343ac3952b19.jpg'
},
{
  name: 'Москва',
  link: 'https://i.pinimg.com/originals/b5/4c/96/b54c966995dabd4adcf6093b4e4c1789.jpg'
},
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

const animationTime = 400;

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

let popupImage = document.querySelector('#popup-image');

let buttonEditClose = document.querySelector('#form-edit__btn-close');
let buttonAddClose = document.querySelector('#form-add__btn-close');
let buttonImageClose = document.querySelector('#form-image__btn-close');
let buttonFormSave = document.querySelector('#edit-form__btn-save');
let buttonFormOpen = document.querySelector('#button_open-form');
let buttonAdd = document.querySelector('#button_add');

function openFormEdit() {
  editFormName.value = profileName.textContent;
  editFormInfo.value = profileInfo.textContent;
  popupEdit.classList.add('popup_opened');
}

function closeFormEdit() {
  popupEdit.querySelector('.popup__container').classList.add('popup__container_condition_hide');
  setTimeout(()=>{
    popupEdit.classList.remove('popup_opened');
    popupEdit.querySelector('.popup__container').classList.remove('popup__container_condition_hide');
    editFormName.value = '';
    editFormInfo.value = '';
  }, animationTime);
}

function openFormAdd() {
  popupAdd.classList.add('popup_opened');
}

function closePopupImage() {
  popupImage.querySelector('.popup__image-wrapper').classList.add('popup__image-wrapper_condition_hide');
  setTimeout(()=>{
    popupImage.classList.remove('popup_opened');
    popupImage.querySelector('.popup__image-wrapper').classList.remove('popup__image-wrapper_condition_hide');
  }, animationTime);
}

function closeFormAdd() {
  popupAdd.querySelector('.popup__container').classList.add('popup__container_condition_hide');
  setTimeout(()=>{
    popupAdd.classList.remove('popup_opened');
    popupAdd.querySelector('.popup__container').classList.remove('popup__container_condition_hide');
    addFormName.value = '';
    addFormLink.value = '';
  }, animationTime);
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

  // добавляем слушателя к ссылке на картинку
  addListenerForImage(placeCardElement.querySelector('.place__photo-link'));

  // добавляем слушателя к кнопке лайк
  addListenerForLike(placeCardElement.querySelector('.place__btn-like'));

  // добавляем слушателя к кнопке удалить
  addListenerForDelete(placeCardElement.querySelector('.place__btn-delete'));

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
  placeCardElement.querySelector('.place__photo').alt = 'Фото ' + addFormName.value.trim();
  placeCardElement.querySelector('.place__name').textContent = addFormName.value.trim();

  // добавляем слушателя к кнопке лайк
  addListenerForLike(placeCardElement.querySelector('.place__btn-like'));

  // добавляем слушателя к кнопке удалить
  addListenerForDelete(placeCardElement.querySelector('.place__btn-delete'));

  // отображаем карточку на странице, в начале списка
  placesCards.prepend(placeCardElement);
  // конец

  closeFormAdd();
}

buttonAdd.addEventListener('click', openFormAdd);
buttonAddClose.addEventListener('click', closeFormAdd);
buttonImageClose.addEventListener('click', closePopupImage);
addForm.addEventListener('submit', addNewPlace);

function makeLike(event) {
  event.target.classList.toggle('place__btn-like_active');
}

function addListenerForLike (button) {
  button.addEventListener('click', makeLike);
}

function openPopupImage(event) {
  event.preventDefault();
  const place = event.target.closest('.place');
  popupImage.querySelector('.popup__image').src = place.querySelector('.place__photo').src;
  popupImage.querySelector('.popup__image').alt = place.querySelector('.place__photo').alt;
  popupImage.querySelector('.popup__signature').textContent = place.querySelector('.place__name').textContent;

  popupImage.classList.add('popup_opened');
}

function deletePlace(event) {
  const place = event.target.closest('.place');
  place.classList.add('place_condition_hide');
  setTimeout(()=>{
    place.remove();
  }, animationTime);
}

function addListenerForDelete (button) {
  button.addEventListener('click', deletePlace);
}

function addListenerForImage (button) {
  button.addEventListener('click', openPopupImage);
}

