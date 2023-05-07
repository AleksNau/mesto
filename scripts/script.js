import {initialCards,validationConfig} from './constants.js'
import FormValidator from './FormValidator.js'
import Card from './Card.js'
import UserInfo from './UserInfo.js'
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

//функции формы профиля - функция колбэк для класса
const submitEditProfileForm = function (event) {
    event.preventDefault();
    const profile = new UserInfo(name.value,info.value);
    profile.setUserInfo();

}

//добавить новую карточку - функция колбэк для класса
const addNewCardElement = function (event){
    event.preventDefault();

    addCard({name: inputPlace.value, link: inputLink.value});
    formAdd.disableButton();

    event.target.reset();
}


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
//при желании удалить


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
    constructor({items, renderer},conteinerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._conteiner = conteinerSelector;
    }

    addItem() {
//принимает DOM-элемент и добавляет его в контейнер
    }
}

class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);

    }
//которые отвечают за открытие и закрытие попапа.
    open = () => {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keyup", this._handleEscClose);
        this.overlay();
        console.log("open");

    }

    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
    }

    _handleEscClose(event) {
//содержит логику закрытия попапа клавишей Esc.
        if (event.keyCode === esc) {
            this.closestOpenedPopup = document.querySelector('.popup_opened');
            this.closestOpenedPopup.classList.remove('popup_opened');
            console.log("_handleEscClose");
        }
    }

    overlay(){
        popups.forEach((popup) => {
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_opened')) {
                    this.close();
                }
                if (evt.target.classList.contains('popup__close-button')) {
                    this.close();
                }
            })
        })
    }

    setEventListeners() {
//оторый добавляет слушатель клика иконке закрытия попапа
        this._button = this._popup.querySelector(".popup__close-button");
        this._button.addEventListener('click', () => this.close(this._popup));
        console.log("setEventListeners");

    }
}

//нужно разложить как то и передать параметры
class PopupWithImage extends Popup {
    open = (name,link) => {
        imageText.textContent = name;//name
        imageZoomed.src = link;//устанавливаем ссылку
        imageZoomed.alt = name;//устанавливаем подпись картинке name
        this._popup.classList.add('popup_opened');
        this.overlay();
    }
}

class PopupWithForm extends Popup {
    constructor(popupSelector,submit) {
        super();
        this._popup = document.querySelector(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector(".popup__form");
    }
//собирает данные всех полей формы
    _getInputValues(e) {
        this._data = Object.fromEntries(new FormData(e.target));
        return this._data;
    }
//добавить сабмит
    setEventListeners() {
        this._button = this._popup.querySelector(".popup__close-button");
        this._button.addEventListener('click', () => this.close(this._popup));
        this._form.addEventListener('submit', this.submitForm);//функция обработчик колбэк сабмита
    }
    //обнулять еще
    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
        this._form.reset();
    }

    submitForm = (event) => {
        this._submit(event);
        this.close();
    }
}



const profilePopupClass = new PopupWithForm('.popup_profile',submitEditProfileForm);
profilePopupClass.setEventListeners();
buttonEdit.addEventListener('click', profilePopupClass.open);

const addNewCardPopupClass = new PopupWithForm('.popup_add',addNewCardElement);
addNewCardPopupClass.setEventListeners();
buttonAddNewElement.addEventListener('click', addNewCardPopupClass.open);