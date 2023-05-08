import {initialCards,validationConfig} from './constants.js'
import FormValidator from './FormValidator.js'
import Card from './Card.js'
import UserInfo from './UserInfo.js'
import Popup from './Popup.js'
import PopupWithForm from "./PopupWithForm.js";

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


//функции формы профиля - функция колбэк для класса
const submitEditProfileForm = function (event) {
    event.preventDefault();
    const profile = new UserInfo(name.value,info.value);
    profile.setUserInfo();

}

//Создаем класс Card
function createCardItem(item) {
    const itemCard = new Card(elementTemplate, item,handleCardClick);
    return itemCard.createCard();
}

const formProfile = new FormValidator(popupFormProfile, validationConfig);
formProfile.enableValidation();
const formAdd = new FormValidator(popupFormAdd, validationConfig);
formAdd.enableValidation();



function handleCardClick(name, link) {
    const ni = new PopupWithImage(".popup_image-zoom");
    ni.setEventListeners()
    document.addEventListener("keyup", ni._handleEscClose);
    ni.open(name,link)
    console.log("handleCardClick")
}


class Section {
    constructor(items, renderer,conteinerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._conteiner = conteinerSelector;
    }

    defoultItems() {
        this._items.forEach((item) => {
            const cardItem = this._renderer(item);
            this._conteiner.prepend(cardItem);
        });
    }

    addItem() {
//принимает DOM-элемент и добавляет его в контейнер
        const cardItem = this._renderer(this._items);
        this._conteiner.prepend(cardItem);

    }
}

//добавить новую карточку - функция колбэк для класса
function addNewCardElement (event){
    event.preventDefault();
    const newSection2 = new Section({name: inputPlace.value, link: inputLink.value},createCardItem,elementsList);
    newSection2.addItem();

    formAdd.disableButton();

    event.target.reset();
}

const newSection = new Section(initialCards,createCardItem,elementsList);
newSection.defoultItems();


//класс изображений
class PopupWithImage extends Popup {
    open = (name,link) => {
        imageText.textContent = name;//name
        imageZoomed.src = link;//устанавливаем ссылку
        imageZoomed.alt = name;//устанавливаем подпись картинке name
        this._popup.classList.add('popup_opened');
        this.overlay();
    }
}

const profilePopupClass = new PopupWithForm('.popup_profile',submitEditProfileForm);
profilePopupClass.setEventListeners();
buttonEdit.addEventListener('click', profilePopupClass.open);

const addNewCardPopupClass = new PopupWithForm('.popup_add',addNewCardElement);
addNewCardPopupClass.setEventListeners();
buttonAddNewElement.addEventListener('click', addNewCardPopupClass.open);