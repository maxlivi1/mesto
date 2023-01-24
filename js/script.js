let profileName = document.querySelector("#profile-name");
let profileInfo = document.querySelector("#profile-info");

let editForm = document.querySelector("#edit-form");
let editFormName = editForm.querySelector("#edit-form__name");
let editFormInfo = editForm.querySelector("#edit-form__information");
let popupEdit = document.querySelector("#popup-edit");

let buttonFormClose = document.querySelector("#popup__btn-close");
let buttonFormSave = document.querySelector("#edit-form__btn-save");
let buttonFormOpen = document.querySelector("#button_open-form");
let buttonAdd = document.querySelector("#button_add");

function openFormEdit() {
  editFormName.value = profileName.textContent;
  editFormInfo.value = profileInfo.textContent;
  popupEdit.classList.add("popup_opened");
}

function closeFormEdit() {
  popupEdit.classList.remove("popup_opened");
  editFormName.value = "";
  editFormInfo.value = "";
}

function saveFormEdit(evt) {
  evt.preventDefault();
  profileName.textContent = editFormName.value.trim();
  profileInfo.textContent = editFormInfo.value.trim();
  closeFormEdit();
}

buttonFormOpen.addEventListener("click", openFormEdit);
buttonFormClose.addEventListener("click", closeFormEdit);
buttonFormSave.addEventListener("click", saveFormEdit);

