import './index.css'
import {initialCards, validationConfig} from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from "../components/PopupWithForm.js"
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupRemove from "../components/PopupRemove.js";
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

}
//создать попап профиль и навесить слушатели
const profilePopupClass = new PopupWithForm('.popup_profile', submitEditProfileForm);
profilePopupClass.setEventListeners();
//создать попап профиль и навесить слушатели
const removePopupClass = new PopupRemove('.popup_remove');
removePopupClass.setEventListeners();
//создать попап новой карточки и навесить слушатели
const addNewCardPopupClass = new PopupWithForm('.popup_add',(item) => {
    renderCard(item);
    formAdd.disableButton();
} );
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

const newSection = new Section(renderCard, ".elements");
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

//функция отрисовки стандартных карточек
function getPosts() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
        headers: {
          authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba'
        }
      })
      .then(res => res.json())
      .then((posts) => {
        posts.forEach((post) => {
            renderCard(post);
        });
      });
  } 
  //getPosts();
//функция получения и установки имени профиля
  function getProfileInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-66/users/me', {
        headers: {
          authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba'
        }
      })
      .then(res => res.json())
      .then((posts) => {
        profile.setUserInfo({name:posts.name,info: posts.about});
      });
  } 
  //getProfileInfo();
//функция отправки имени на серв
  function setName() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
});
  }
 // setName();

//функция добавления новой карточки на серв
 function newCard() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
  method: 'POST',
  headers: {
    authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'НеЯпония',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  })
});}

getPosts();
//функция удаления карточки по id
function deleteCard() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards/id', {
  method: 'DELETE',
  headers: {
    authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba',
    'Content-Type': 'application/json'
  }
});}

