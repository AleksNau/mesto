import FormValidator from './FormValidator.js'
import Card from './Card.js'
//переменные профиля
const profileElement = document.querySelector('.profile');
const buttonEdit = profileElement.querySelector('.profile__edit-button');
const profileName = profileElement.querySelector('.profile__name');
const profileInfo = profileElement.querySelector('.profile__info');

// переменные формы профиля
const popupElement = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');

// переменные формы карточки
const popupElementAddNewCard = document.querySelector(".popup_add");
const popupFormAdd = popupElementAddNewCard.querySelector('.popup__form_add');
const buttonAddNewElement = profileElement.querySelector(".profile__add-button");

// переменные формы изображения
export const popupImage = document.querySelector(".popup_image-zoom");
const imageZoomed = popupImage.querySelector(".popup__image");
const imageText = popupImage.querySelector(".popup__place-name");

// инпуты
const name = popupElement.querySelector('.popup__input_type_name');
const info = popupElement.querySelector('.popup__input_type_info');
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
    const buttonSubmit = popupFormAdd.querySelector('.popup__submit');

    addCard({name: inputPlace.value, link: inputLink.value});
    formAdd.disableButton(buttonSubmit, validationConfig);
    closePopup(popupElementAddNewCard);
    event.target.reset();
}

// функция увеличения изображения
export function zoomCardImage(event) {
    const elementItem = event.currentTarget.closest(".elements__item");
    const imageName = elementItem.querySelector(".elements__text").textContent;
    imageText.textContent = imageName;
    imageZoomed.src = event.currentTarget.src;
    imageZoomed.alt = imageName;
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

//закрытие по оверлею
function popupCloseByClickOnOverlay() {
    const popups = Array.from(document.querySelectorAll('.popup'));
    popups.forEach(popap => {
        popap.addEventListener('click', (e) => {
            if (e.target !== popap) {
                return;
            }
            closePopup(e.target);
        });
    })
}

//закрытие по esc
export function addListenerCloseByEsc(event) {
    const closestOpenedPopup = document.querySelector('.popup_opened');
    if (event.keyCode === esc) {
        closePopup(closestOpenedPopup);
    }
}

function openProfilePopup() {
    openPopup(popupProfile);
    fillName();
}

function openAddCardPopup() {
    openPopup(popupElementAddNewCard);
    addListenerCloseByEsc(popupElementAddNewCard);
}

popupCloseByClickOnOverlay();


//Создаем класс Card



//добавить карточку на страницу
function addCard(item) {
    const itemCard = new Card(elementTemplate, item);
    elementsList.prepend(itemCard.createCard());
}

//отрисовка стандартных карточек
initialCards.forEach((item) => {
    addCard(item)
});

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_invalid',
    inputErrorClass: 'popup__input_type_error'
};

const formProfile = new FormValidator('.popup__form_profile', validationConfig);
formProfile.enableValidation();
const formAdd = new FormValidator('.popup__form_add', validationConfig);
formAdd.enableValidation();