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

//функции формы профиля - функция колбэк для класса
const submitEditProfileForm = function (event) {
    event.preventDefault();
    profileName.textContent = name.value;
    profileInfo.textContent = info.value;
    closePopup(popupProfile);
    console.log("submitEditProfileForm");
}

//добавить новую карточку - функция колбэк для класса
const addNewCardElement = function (event){
    event.preventDefault();

    addCard({name: inputPlace.value, link: inputLink.value});
    formAdd.disableButton();
    closePopup(popupElementAddNewCard);
    event.target.reset();
    console.log("addNewCardElement");
}

//универсальная функция закрытия попапа кроме изображений
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


//Создаем класс Card
function createCardItem(item) {
    const itemCard = new Card(elementTemplate, item,handleCardClick);
    return itemCard.createCard();
    console.log("createCardItem");
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
        console.log("open")
    }

    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
        console.log("close")
    }

    _handleEscClose(event) {
//содержит логику закрытия попапа клавишей Esc.
        if (event.keyCode === esc) {
            const closestOpenedPopup = document.querySelector('.popup_opened');
            closePopup(closestOpenedPopup);
            console.log("_handleEscClose");
        }
    }

    setEventListeners() {
//оторый добавляет слушатель клика иконке закрытия попапа
        this._button = this._popup.querySelector(".popup__close-button");
        this._button.addEventListener('click', () => this.close(this._popup));
       // buttonEdit.addEventListener('click', this.open);
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
       // buttonEdit.addEventListener('click', this.open);
        this._form.addEventListener('submit', this._submit);//функция обработчик колбэк сабмита
        console.log("setEventListenersPopupWithForm");
    }
    //обнулять еще
    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
        this._form.reset();
    }
}

class UserInfo {
    constructor(name,info) {
        this._name = name;
        this._info = info;
    }
// возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {

    }

//принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo() {

    }
}

const pop = new PopupWithForm('.popup_profile',submitEditProfileForm);
pop.setEventListeners();
buttonEdit.addEventListener('click', pop.open);

const pop2 = new PopupWithForm('.popup_add',addNewCardElement);
pop2.setEventListeners();
buttonAddNewElement.addEventListener('click', pop2.open);