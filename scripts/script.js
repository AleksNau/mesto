//переменные профиля
const profileElement = document.querySelector('.profile');
const buttonEdit = profileElement.querySelector('.profile__edit-button');
const profileName = profileElement.querySelector('.profile__name');
const profileInfo = profileElement.querySelector('.profile__info');

// переменные формы профиля
const popupElement = document.querySelector('.popup');
const popupForm = popupElement.querySelector('.popup__form');
const closeButton = popupElement.querySelector('.popup__close-button');

// переменные формы карточки
const popupElementAddNewCard = document.querySelector(".popup_add");
const createNewElementButton = popupElementAddNewCard.querySelector(".popup__create-button");
const buttonAddNewElement = profileElement.querySelector(".profile__add-button");
const closeButtonNewCard = popupElementAddNewCard.querySelector('.popup__close-button');

// переменные формы изображения
const popupImage = document.querySelector(".popup_image-zoom");
const imageZoomed = popupImage.querySelector(".popup__image");
const buttonCloseZoom = popupImage.querySelector('.popup__close-button');
const imageText = popupImage.querySelector(".popup__place-name");


let name = popupElement.querySelector('.popup__input_type_name');
let info = popupElement.querySelector('.popup__input_type_info');
//переменные карточек

//функции профиля

function fillName() {
    name.value = profileName.textContent;
    info.value = profileInfo.textContent;
}

//функции формы профиля

const openPopup = function () {
    popupElement.classList.add('popup_opened');
    fillName();
}

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
}

const savePopup = function (event) {
    event.preventDefault();
    profileName.textContent = name.value;
    profileInfo.textContent = info.value;
    closePopup();
}

//функции создания новой карточки

const openPopupNewCard = function () {
    popupElementAddNewCard.classList.add('popup_opened');
}

const closePopupNewCard = function () {
    popupElementAddNewCard.classList.remove('popup_opened');
}

//функции зума
const closePopupZoom = function () {
    popupImage.classList.remove('popup_opened');
}

//слушателя формы профиля
buttonEdit.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', savePopup);

//слушателя формы новой карточки
buttonAddNewElement.addEventListener("click", openPopupNewCard);
closeButtonNewCard.addEventListener('click', closePopupNewCard);
createNewElementButton.addEventListener('click', addNewCardElement);

//слушатели зума изображения
buttonCloseZoom.addEventListener('click', closePopupZoom);


//блок отрисовки элементов
const elementsList = document.querySelector(".elements");
const elementTemplate = document.querySelector(".template-item").content;

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


//Отрисовка элеметов списка
initialCards.forEach(renderItem);

// Добавить код элемента в разметку
function renderItem(item) {
    const htmlElement = elementTemplate.cloneNode(true);
    htmlElement.querySelector(".elements__image").src = item.link;
    htmlElement.querySelector(".elements__image").alt = item.name;
    htmlElement.querySelector(".elements__text").textContent = item.name;
    setEventListener(htmlElement);

    elementsList.prepend(htmlElement);

}

//добавляем слушатели на каждый созданый элемент

function setEventListener(htmlElement) {
    //закрасить лайк
    htmlElement.querySelector(".elements__like").addEventListener("click", addLike);
    //просмотреть изображение полностью
    htmlElement.querySelector(".elements__image").addEventListener("click", zoomCardImage);
    //функция удаления
    htmlElement.querySelector(".elements__delete").addEventListener("click", deleteCard);

}

//функция навешивания лайка
function addLike(event) {
    event.currentTarget.classList.toggle("elements__like_active");
}

//добавить новую карточку

function addNewCardElement(event) {
    event.preventDefault();
    const newElem = {};
    newElem.name = popupElementAddNewCard.querySelector(".popup__input_type_place").value;
    newElem.link = popupElementAddNewCard.querySelector(".popup__input_type_image-link").value;
    initialCards.push(newElem);
    renderItem(initialCards[initialCards.length - 1]);
    closePopupNewCard();
}

// функция увеличения изображения

function zoomCardImage(event) {
    const elementItem = event.currentTarget.closest(".elements__item");
    imageText.textContent = elementItem.querySelector(".elements__text").textContent;
    imageZoomed.src = event.currentTarget.src;
    popupImage.classList.add('popup_opened');
}


//функция удаления карточки

function deleteCard(event) {
    const card = event.target.closest(".elements__item");
    card.remove();
}
