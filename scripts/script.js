//переменные профиля
const profileElement = document.querySelector('.profile');
const buttonEdit = profileElement.querySelector('.profile__edit-button');
const profileName = profileElement.querySelector('.profile__name');
const profileInfo = profileElement.querySelector('.profile__info');

// переменные формы профиля
const popupElement = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');

// переменные формы карточки
const popupElementAddNewCard = document.querySelector(".popup_add");
const popupFormAdd = popupElementAddNewCard.querySelector('.popup__form');
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
//код кнопки esc
const esc = 27;

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');

//функции профиля
function fillName() {
    name.value = profileName.textContent;
    info.value = profileInfo.textContent;
}

//функции формы профиля
const submitEditProfileForm = function (event) {
    event.preventDefault();
    profileName.textContent = name.value;
    profileInfo.textContent = info.value;
    closePopup(popupProfile);
}

//слушателя формы профиля
buttonEdit.addEventListener('click', openProfilePopup);

popupProfile.addEventListener('submit', submitEditProfileForm);

//слушателя формы новой карточки
buttonAddNewElement.addEventListener("click", openAddCardPopup);

popupElementAddNewCard.addEventListener('submit', addNewCardElement);


//Отрисовка элеметов списка
initialCards.forEach(addCard);

// создать прототип карточки
function createCard(item) {
    const htmlElement = elementTemplate.cloneNode(true);
    const imageElement =  htmlElement.querySelector(".elements__image");
    imageElement.src = item.link;
    imageElement.alt = item.name;
    htmlElement.querySelector(".elements__text").textContent = item.name;
    setEventListener(htmlElement);

    return htmlElement;
}

//добавить карточку на страницу
function addCard(item) {
    elementsList.prepend(createCard(item));
}

//добавляем слушатели на каждый созданый элемент
function setEventListener(htmlElement) {
    //закрасить лайк
    htmlElement.querySelector(".elements__like").addEventListener("click", addLike);
    //просмотреть изображение полностью
    htmlElement.querySelector(".elements__image").addEventListener("click", openImage);
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
    const buttonSubmit = popupFormAdd.querySelector('.popup__submit');
    addCard({name: inputPlace.value, link: inputLink.value});
    disableButton(buttonSubmit, validationConfig);
    closePopup(popupElementAddNewCard);
    event.target.reset();
}

// функция увеличения изображения
function zoomCardImage(event) {
    const elementItem = event.currentTarget.closest(".elements__item");
    const imageName = elementItem.querySelector(".elements__text").textContent;
    imageText.textContent = imageName;
    imageZoomed.src = event.currentTarget.src;
    imageZoomed.alt = imageName;
}

//функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest(".elements__item");
    card.remove();
}

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

//универсальная функция закрытия попапа кроме изображений
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keyup", addListenerCloseByEsc);

}
//универчальная функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keyup", addListenerCloseByEsc);
}
//закрытие по оверлею
function popupCloseByClickOnOverlay () {
    const popups =Array.from(document.querySelectorAll('.popup'));
    popups.forEach(popap => {
        popap.addEventListener('click', (e) => {
            if (e.target !== popap) {
                return;
            }
            closePopup(e.target);
        });
    })
}

//закрытие по esc
function addListenerCloseByEsc (event) {
    const closestOpenedPopup = document.querySelector('.popup_opened');
        if (event.keyCode === esc) {
            closePopup(closestOpenedPopup);
        }
}

function openProfilePopup () {
    openPopup(popupProfile);
    fillName();
}

function openAddCardPopup () {
    openPopup(popupElementAddNewCard);
    addListenerCloseByEsc(popupElementAddNewCard);
}

function openImage (event) {
    openPopup(popupImage);
    zoomCardImage(event);
    addListenerCloseByEsc(popupImage);
}
popupCloseByClickOnOverlay();


//Создаем класс Card

class Card {
    //принимает в себя два параметра
    constructor(data, templateSelector) {
        this._data = data;
        this._template = templateSelector;
    }

    //имеет несколько методов
//метод получения template
    getTemplate() {
        return this._template;
    }

//метод лайка
    addLike(event) {
        event.currentTarget.classList.toggle("elements__like_active");
    } 
    
//метод удаления карточки 
    deleteCard(event) {
        const card = event.target.closest(".elements__item");
        card.remove();
    }
//Метод открытия попапа с картинкой 
    openImage (event) {
        openPopup(popupImage);
        zoomCardImage(event);
        addListenerCloseByEsc(popupImage);
    }
//метод навешивания всех слушателей
    setEventListener(htmlElement) {
        //закрасить лайк
        htmlElement.querySelector(".elements__like").addEventListener("click", addLike);
        //просмотреть изображение полностью
        htmlElement.querySelector(".elements__image").addEventListener("click", openImage);
        //функция удаления
        htmlElement.querySelector(".elements__delete").addEventListener("click", deleteCard);
    }
//Основной (публичный) метод создания карточки, в котором мы вызываем нужные методы и наполняем будущую карточку данными из формы.
    createCard() {

    }  
      
}