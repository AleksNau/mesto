import {initialCards, validationConfig} from './constants.js'
import FormValidator from './FormValidator.js'
import Card from './Card.js'
import UserInfo from './UserInfo.js'
import PopupWithForm from "./PopupWithForm.js"
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
//переменные профиля
const profileElement = document.querySelector('.profile');
const buttonEdit = profileElement.querySelector('.profile__edit-button');

// переменные формы профиля
const popupProfile = document.querySelector('.popup_profile');
const popupFormProfile = popupProfile.querySelector('.popup__form_profile');

// переменные формы карточки
const popupElementAddNewCard = document.querySelector(".popup_add");
const popupFormAdd = popupElementAddNewCard.querySelector('.popup__form_add');
const buttonAddNewElement = profileElement.querySelector(".profile__add-button");

// инпуты
const name = popupProfile.querySelector('.popup__input_type_name');
const info = popupProfile.querySelector('.popup__input_type_info');
const inputPlace = popupElementAddNewCard.querySelector(".popup__input_type_place");
const inputLink = popupElementAddNewCard.querySelector(".popup__input_type_image-link");

//карточки и темплейт
const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector(".template-item").content;
//создаем профиль
const profile = new UserInfo(name.value, info.value);
//включаем валидацию попап-профиля
const formProfile = new FormValidator(popupFormProfile, validationConfig);
formProfile.enableValidation();
//включаем валидацию попап-добавления карточки
const formAdd = new FormValidator(popupFormAdd, validationConfig);
formAdd.enableValidation();
//создать секцию и отрисовать стартовые карточки
const newSection = new Section(initialCards, createCardItem, elementsList);
newSection.defoultItems();
//создать попап профиль и навесить слушатели
const profilePopupClass = new PopupWithForm('.popup_profile', submitEditProfileForm);
profilePopupClass.setEventListeners();
//создать попап новой карточки и навесить слушатели
const addNewCardPopupClass = new PopupWithForm('.popup_add', addNewCardElement);
addNewCardPopupClass.setEventListeners();

//функции формы профиля - функция колбэк для класса
function submitEditProfileForm(event, item) {
    event.preventDefault();
    const profile = new UserInfo(item.Name, item.Info);
    profile.setUserInfo();
}

//Создаем класс Card
function createCardItem(item) {
    const itemCard = new Card(elementTemplate, item, handleCardClick);
    return itemCard.createCard();
}

function handleCardClick(name, link) {
    const handleImage = new PopupWithImage(".popup_image-zoom");
    handleImage.setEventListeners();
    document.addEventListener("keyup", handleImage._handleEscClose);
    handleImage.open(name, link);
}

//добавить новую карточку - функция колбэк для класса
function addNewCardElement(event, item) {
    event.preventDefault();
    const addSection = new Section({name: item.place, link: item.imagelink}, createCardItem, elementsList);
    addSection.addItem();
    formAdd.disableButton();
    event.target.reset();
}

//навесить слушатель  на кнопку и передать ей инфо с профиля
buttonEdit.addEventListener('click', () => {
    profile.setPopupInfo(profile.getUserInfo());
    profilePopupClass.open();
});

//навесить слушатель на кнопку новой карточки
buttonAddNewElement.addEventListener('click', addNewCardPopupClass.open);
