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
popupForm.addEventListener('submit', savePopup);


//блок отрисовки элементов
const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector(".template__item").content;


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
//Отрисовка элеметов списка
initialCards.forEach(renderItem);

// Добавить код элемента в разметку
function renderItem(item) {
    const htmlElement = elementTemplate.cloneNode(true);
    htmlElement.querySelector(".elements__image").src = item.link;
    htmlElement.querySelector(".elements__image").alt = item.name;
    htmlElement.querySelector(".elements__text").textContent = item.name;

    elementsList.append(htmlElement);

}
