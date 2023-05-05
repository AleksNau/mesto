import {initialCards,validationConfig} from './constants.js'
import FormValidator from './FormValidator.js'
import Card from './Card.js'
//переменные профиля
const profileElement = document.querySelector('.profile');
const buttonEdit = profileElement.querySelector('.profile__edit-button');
const profileName = profileElement.querySelector('.profile__name');
const profileInfo = profileElement.querySelector('.profile__info');

// переменные формы профиля
const popupProfile = document.querySelector('.popup_profile');
const popupFormProfile = popupProfile.querySelector('.popup__form_profile');

// переменные формы карточки
const popupElementAddNewCard = document.querySelector(".popup_add");
const popupFormAdd = popupElementAddNewCard.querySelector('.popup__form_add');
const buttonAddNewElement = profileElement.querySelector(".profile__add-button");

// переменные формы изображения
export const popupImage = document.querySelector(".popup_image-zoom");
const imageZoomed = popupImage.querySelector(".popup__image");
const imageText = popupImage.querySelector(".popup__place-name");

// инпуты
const name = popupProfile.querySelector('.popup__input_type_name');
const info = popupProfile.querySelector('.popup__input_type_info');
const inputPlace = popupElementAddNewCard.querySelector(".popup__input_type_place");
const inputLink = popupElementAddNewCard.querySelector(".popup__input_type_image-link");

//карточки и темплейт
const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector(".template-item").content;
//код кнопки esc
const esc = 27;

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');

//функции профиля
function fillName() {
    name.value = profileName.textContent;
    info.value = profileInfo.textContent;
}

//функции формы профиля
const submitEditProfileForm = function (event) {
    event.preventDefault();
    profileName.textContent = name.value;
    profileInfo.textContent = info.value;
    closePopup(popupProfile);
}

//слушателя формы профиля
buttonEdit.addEventListener('click', openProfilePopup);

popupProfile.addEventListener('submit', submitEditProfileForm);

//слушателя формы новой карточки
buttonAddNewElement.addEventListener("click", openAddCardPopup);

popupElementAddNewCard.addEventListener('submit', addNewCardElement);


//добавить новую карточку
function addNewCardElement(event) {
    event.preventDefault();

    addCard({name: inputPlace.value, link: inputLink.value});
    formAdd.disableButton();
    closePopup(popupElementAddNewCard);
    event.target.reset();
}


closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

//универсальная функция закрытия попапа кроме изображений
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keyup", addListenerCloseByEsc);

}

//универчальная функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keyup", addListenerCloseByEsc);
}

//закрытие по esc
function addListenerCloseByEsc(event) {

    if (event.keyCode === esc) {
        const closestOpenedPopup = document.querySelector('.popup_opened');
        closePopup(closestOpenedPopup);
    }
}

function openProfilePopup() {
    openPopup(popupProfile);
    fillName();
}

function openAddCardPopup() {
    openPopup(popupElementAddNewCard);
}

//popupCloseByClickOnOverlay();


//Создаем класс Card
function createCardItem(item) {
    const itemCard = new Card(elementTemplate, item,handleCardClick);
    return itemCard.createCard();
}


//добавить карточку на страницу
function addCard(item) {
    const cardItem = createCardItem(item);
    elementsList.prepend(cardItem);
}

//отрисовка стандартных карточек
initialCards.forEach(addCard);

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

const formProfile = new FormValidator(popupFormProfile, validationConfig);
formProfile.enableValidation();
const formAdd = new FormValidator(popupFormAdd, validationConfig);
formAdd.enableValidation();



function handleCardClick(name, link) {
    imageText.textContent = name;//name
    imageZoomed.src = link;//устанавливаем ссылку
    imageZoomed.alt = name;//устанавливаем подпись картинке name
    openPopup(popupImage);//открываем попап универсальной функцией, которая навешивает обработчик Escape внутри себя
}