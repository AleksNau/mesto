import './index.css'
import {initialCards, validationConfig} from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from "../components/PopupWithForm.js"
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupRemove from "../components/PopupRemove.js";
import Api from '../components/Api.js'
//переменные профиля
const profileElement = document.querySelector('.profile');
const buttonEdit = profileElement.querySelector('.profile__edit-button');
const profileAvatar = profileElement.querySelector('.profile__avatar');
const profileAvatarButton = profileElement.querySelector('.profile__avatar-button');


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
const profile = new UserInfo('.profile__name','.profile__info', '.profile__avatar');
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


const removePopupClass = new PopupRemove('.popup_remove',handleDelete);
removePopupClass.setEventListeners();



//создать попап новой карточки и навесить слушатели
const addNewCardPopupClass = new PopupWithForm('.popup_add',(item) => {
    api.newCard(item.name, item.link);
    renderCard(item);
    formAdd.disableButton();
} );
addNewCardPopupClass.setEventListeners();


export const api = new Api(profile,"https://mesto.nomoreparties.co/v1/cohort-66",
    {
        authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba',
        'Content-Type': 'application/json'
    });

/* Хендлер поставноки и снятия лайков */
const handleLikeCard = (card) => {
    if (!card.isLiked()) {
        api.putLike(card.getCardId())
            .then(cardData => {
                card.updateLikes(cardData);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        api.deleteLike(card.getCardId())
            .then(cardData => {
                card.updateLikes(cardData);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};


const handleImage = new PopupWithImage(".popup_image-zoom");

//функции формы профиля - функция колбэк для класса
function submitEditProfileForm() {
    api.setName(name.value,info.value);
    profile.setUserInfo({name:name.value, about: info.value});
}

//Создаем класс Card
function createCardItem(item) {
    const itemCard = new Card(elementTemplate, item, handleCardClick,api, userId, handleLikeCard,removePopupClass.open);

    itemCard.updateLikes(item);
    return itemCard.createCard();
}

function handleCardClick(name, link) {
    handleImage.setEventListeners();
    handleImage.open(name, link);
}

const newSection = new Section(renderCard, ".elements");



//навесить слушатель  на кнопку и передать ей инфо с профиля
buttonEdit.addEventListener('click', () => {
    const userData = profile.getUserInfo();
    popupName.value = userData.name;
    popupinfo.value = userData.about;
    profilePopupClass.open();
});

//навесить слушатель на кнопку новой карточки
buttonAddNewElement.addEventListener('click', addNewCardPopupClass.open);

const avatarPopup = new PopupWithForm('.popup_avatar', setAvatar);
avatarPopup.setEventListeners();

function setAvatar () {
    const newLink = avatarPopup._getInputValues().link;
    api.sendAvatar(newLink);
    profileAvatar.src = newLink;

}

profileAvatarButton.addEventListener('click', avatarPopup.open);

let userId = null;

/* Вывод данных пользователя и карточек на сраницу*/
const getInfo = Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cardData]) => {
    profile.setUserInfo(userData);
    profile.setAvatar(userData);
    userId = userData._id;
    newSection.renderItems(cardData.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

function handleDelete (card, id) {
    api.deleteCard(id);
    card.remove();
}