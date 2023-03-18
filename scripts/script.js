const popupElement = document.querySelector('.popup');
const popupForm = popupElement.querySelector('.popup__form');
const closeButton = popupElement.querySelector('.popup__close-button');

const profileElement = document.querySelector('.profile');
const buttonEdit = profileElement.querySelector('.profile__edit-button');
const profileName = profileElement.querySelector('.profile__name');
const profileInfo = profileElement.querySelector('.profile__info');

let name = popupElement.querySelector('.popup__input_type_name');
let info = popupElement.querySelector('.popup__input_type_info');

function fillName() {
    name.value = profileName.textContent;
    info.value = profileInfo.textContent;
}


const openPopup = function () {
    popupElement.classList.add('popup_opened');
    fillName();
}

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
}

const savePopup = function (event) {
    event.preventDefault();
    profileName.textContent = name.value;
    profileInfo.textContent = info.value;
    closePopup();
}


buttonEdit.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit',savePopup);
