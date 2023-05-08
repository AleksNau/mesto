import {initialCards,validationConfig} from './constants.js'
import FormValidator from './FormValidator.js'
import Card from './Card.js'
import UserInfo from './UserInfo.js'
import Popup from './Popup.js'
import PopupWithForm from "./PopupWithForm.js";
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
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


const formProfile = new FormValidator(popupFormProfile, validationConfig);
formProfile.enableValidation();
const formAdd = new FormValidator(popupFormAdd, validationConfig);
formAdd.enableValidation();



//передаём функцию createCardItem в renderer
const newSection = new Section(initialCards,(item) => {
    const itemCard = new Card(elementTemplate, item,(name, link) => {
        const imagePopup = new PopupWithImage(".popup_image-zoom");
        imagePopup.setEventListeners()
        document.addEventListener("keyup", imagePopup._handleEscClose);
        imagePopup.open(name,link)
    });
    return itemCard.createCard();
},elementsList);
newSection.defoultItems();


//класс изображений

//передаем функцию submitEditProfileForm
const profilePopupClass = new PopupWithForm('.popup_profile',(event) => {
    event.preventDefault();
    const profile = new UserInfo(name.value,info.value);
    profile.setUserInfo();
});
profilePopupClass.setEventListeners();
buttonEdit.addEventListener('click', profilePopupClass.open);
//передаем addNewCardElement
const addNewCardPopupClass = new PopupWithForm('.popup_add',(event) => {
    event.preventDefault();
    //передаём функцию createCardItem в renderer
    const newSection2 = new Section({name: inputPlace.value, link: inputLink.value},(item) => {
        //передаем функцию handleCardClick
        const itemCard = new Card(elementTemplate, item,(name, link) => {
            const ni = new PopupWithImage(".popup_image-zoom");
            ni.setEventListeners()
            document.addEventListener("keyup", ni._handleEscClose);
            ni.open(name,link)
        });
        return itemCard.createCard();
    },elementsList);
    newSection2.addItem();

    formAdd.disableButton();

    event.target.reset();
});
addNewCardPopupClass.setEventListeners();
buttonAddNewElement.addEventListener('click', addNewCardPopupClass.open);