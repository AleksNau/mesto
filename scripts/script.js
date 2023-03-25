//переменные профиля
const profileElement = document.querySelector('.profile');
const buttonEdit = profileElement.querySelector('.profile__edit-button');
const profileName = profileElement.querySelector('.profile__name');
const profileInfo = profileElement.querySelector('.profile__info');

// переменные формы профиля
const popupElement = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupForm = popupElement.querySelector('.popup__form');

// переменные формы карточки
const popupElementAddNewCard = document.querySelector(".popup_add");
const buttonAddNewElement = profileElement.querySelector(".profile__add-button");

// переменные формы изображения
const popupImage = document.querySelector(".popup_image-zoom");
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

//изначальные карточки
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

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');

//функции профиля
function fillName() {
    name.value = profileName.textContent;
    info.value = profileInfo.textContent;
}

//функции формы профиля
const savePopup = function (event) {
    event.preventDefault();
    profileName.textContent = name.value;
    profileInfo.textContent = info.value;
    closePopup(event.currentTarget.closest('.popup'));
}

//слушателя формы профиля
buttonEdit.addEventListener('click', openPopup);

popupProfile.addEventListener('submit', savePopup);

//слушателя формы новой карточки
buttonAddNewElement.addEventListener("click", openPopup);

popupElementAddNewCard.addEventListener('submit', addNewCardElement);


//Отрисовка элеметов списка
initialCards.forEach(addCard);

// создать прототип карточки
function createCard(item) {
    const htmlElement = elementTemplate.cloneNode(true);
    htmlElement.querySelector(".elements__image").src = item.link;
    htmlElement.querySelector(".elements__image").alt = item.name;
    htmlElement.querySelector(".elements__text").textContent = item.name;
    setEventListener(htmlElement);

    return htmlElement;
}

//добавить карточку на страницу
function addCard (item) {
    elementsList.prepend(createCard(item));
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
    newElem.name = inputPlace.value;
    newElem.link = inputLink.value;
    if (newElem.name === "" || newElem.link === "") {
        return
    }
    addCard(createCard(newElem));
    closePopup(event.currentTarget.closest('.popup'));
    event.target.reset();
}

// функция увеличения изображения
function zoomCardImage(event) {
    const elementItem = event.currentTarget.closest(".elements__item");
    const imageName = elementItem.querySelector(".elements__text").textContent;
    imageText.textContent = imageName;
    imageZoomed.src = event.currentTarget.src;
    imageZoomed.alt = imageName;
    popupImage.classList.add('popup_opened');
}

//функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest(".elements__item");
    card.remove();
}


//универсальная функция открытия попапа кроме изображений
function openPopup(event) {
    switch (event.currentTarget){
        case buttonEdit:
            popupProfile.classList.add('popup_opened');
            fillName();
            break;
        case buttonAddNewElement:
            popupElementAddNewCard.classList.add('popup_opened');
            break;
    }
}

closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});

//универсальная функция закрытия попапа кроме изображений
function closePopup (popup) {
    popup.classList.remove('popup_opened');
}