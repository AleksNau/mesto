const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__close-button');
const saveButton = popupElement.querySelector('.popup__save-button');

const profileElement = document.querySelector('.profile');
const editButton = profileElement.querySelector('.profile__edit-button');
const addButton = profileElement.querySelector('.profile__add-button');
const profileName = profileElement.querySelector('.profile__name');
const profileInfo = profileElement.querySelector('.profile__info');
const elementsList = document.querySelector(".elements");

let name = popupElement.querySelector('.popup__input_type-name');
let info = popupElement.querySelector('.popup__input_type-info');

function fillName() {
    name.value = profileName.innerText;
}

function fillInfo() {
    info.value = profileInfo.innerText;
}


const popupOpen = function () {
    popupElement.classList.add('popup_is-opened');
    fillName();
    fillInfo();
}

const popupClose = function () {
    popupElement.classList.remove('popup_is-opened');
    name.value = undefined;
    info.value = undefined;
}

const popupSave = function (event) {
    event.preventDefault();
    profileName.innerText = name.value;
    profileInfo.innerText = info.value;
    popupElement.classList.remove('popup_is-opened');
}


const popupCloseByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popupElement.addEventListener('click', popupCloseByClickOnOverlay);
saveButton.addEventListener('click', popupSave);

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

initialCards.forEach(renderItem);

function renderItem(item) {
    elementsList.insertAdjacentHTML("beforeend", `
    <li class="elements__item">
                <img src="${item.link}" alt="'Элемент'" class="elements__image">
                <div class="elements__info">
                    <p class="elements__text">${item.name}</p>
                    <img src="./images/like.svg" alt="like" class="elements__like">
                </div>
            </li>
    
    `)
}