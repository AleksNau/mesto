const popupElement = document.querySelector('.popup');
const popupForm = popupElement.querySelector('.popup__conteiner');
const closeButton = popupElement.querySelector('.popup__close-button');
const saveButton = popupElement.querySelector('.popup__save-button');

const profileElement = document.querySelector('.profile');
const editButton = profileElement.querySelector('.profile__edit-button');
const profileName = profileElement.querySelector('.profile__name');
const profileInfo = profileElement.querySelector('.profile__info');

let name = popupElement.querySelector('.popup__input_type-name');
let info = popupElement.querySelector('.popup__input_type-info');

function fillName() {
    name.value = profileName.textContent;
    info.value = profileInfo.textContent;
}


const popupOpen = function () {
    popupElement.classList.add('popup_opened');
    fillName();
}

const popupClose = function () {
    popupElement.classList.remove('popup_opened');
}

const popupSave = function (event) {
    event.preventDefault();
    profileName.textContent = name.value;
    profileInfo.textContent = info.value;
    popupClose();
}


editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
saveButton.addEventListener('click', popupSave);
popupForm.addEventListener('submit',popupSave);