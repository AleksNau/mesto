import './index.css'
import {initialCards, validationConfig} from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from "../components/PopupWithForm.js"
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
//переменные профиля
const profileElement = document.querySelector('.profile');
const buttonEdit = profileElement.querySelector('.profile__edit-button');

// переменные формы профиля
const popupProfile = document.querySelector('.popup_profile');
const popupFormProfile = popupProfile.querySelector('.popup__form_profile');
const popupName = popupProfile.querySelector('.popup__input_type_name');
const popupinfo = popupProfile.querySelector('.popup__input_type_info');

// переменные формы карточки
const popupElementAddNewCard = document.querySelector(".popup_add");
const popupFormAdd = popupElementAddNewCard.querySelector('.popup__form_add');
const buttonAddNewElement = profileElement.querySelector(".profile__add-button");

// инпуты
const name = popupProfile.querySelector('.popup__input_type_name');
const info = popupProfile.querySelector('.popup__input_type_info');

//карточки и темплейт
const elementTemplate = document.querySelector(".template-item").content;
//создаем профиль
const profile = new UserInfo('.profile__name','.profile__info');
//включаем валидацию попап-профиля
const formProfile = new FormValidator(popupFormProfile, validationConfig);
formProfile.enableValidation();
//включаем валидацию попап-добавления карточки
const formAdd = new FormValidator(popupFormAdd, validationConfig);
formAdd.enableValidation();
//создать секцию и отрисовать стартовые карточки
const renderCard = (cardData) => {
    const cardItem = createCardItem(cardData)
    newSection.addItem(cardItem)
    formAdd.disableButton();
}
//создать попап профиль и навесить слушатели
const profilePopupClass = new PopupWithForm('.popup_profile', submitEditProfileForm);
profilePopupClass.setEventListeners();
//создать попап новой карточки и навесить слушатели
const addNewCardPopupClass = new PopupWithForm('.popup_add', renderCard);
addNewCardPopupClass.setEventListeners();

const handleImage = new PopupWithImage(".popup_image-zoom");

//функции формы профиля - функция колбэк для класса
function submitEditProfileForm() {
    profile.setUserInfo({name:name.value,info: info.value});
}

//Создаем класс Card
function createCardItem(item) {
    const itemCard = new Card(elementTemplate, item, handleCardClick);
    return itemCard.createCard();
}

function handleCardClick(name, link) {
    handleImage.setEventListeners();
    handleImage.open(name, link);
}

const newSection = new Section(initialCards, renderCard, ".elements");
newSection.renderItems(initialCards);


//навесить слушатель  на кнопку и передать ей инфо с профиля
buttonEdit.addEventListener('click', () => {
    const userData = profile.getUserInfo();
    popupName.value = userData.name;
    popupinfo.value = userData.info;
    profilePopupClass.open();
});

//навесить слушатель на кнопку новой карточки
buttonAddNewElement.addEventListener('click', addNewCardPopupClass.open);
