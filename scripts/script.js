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
const popupFormAdd = popupElementAddNewCard.querySelector('.popup__form_add');
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


//добавить новую карточку
function addNewCardElement(event) {
    event.preventDefault();
    const buttonSubmit = popupFormAdd.querySelector('.popup__submit');

    addCard({name: inputPlace.value, link: inputLink.value});
    formAdd.disableButton(buttonSubmit, validationConfig);
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
function popupCloseByClickOnOverlay() {
    const popups = Array.from(document.querySelectorAll('.popup'));
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
function addListenerCloseByEsc(event) {
    const closestOpenedPopup = document.querySelector('.popup_opened');
    if (event.keyCode === esc) {
        closePopup(closestOpenedPopup);
    }
}

function openProfilePopup() {
    openPopup(popupProfile);
    fillName();
}

function openAddCardPopup() {
    openPopup(popupElementAddNewCard);
    addListenerCloseByEsc(popupElementAddNewCard);
}

popupCloseByClickOnOverlay();


//Создаем класс Card

class Card {
    //принимает в себя два параметра
    constructor(templateSelector, data) {
        this._data = data;
        this._template = templateSelector;
    }

//метод навешивания лайка
    addLike(event) {
        event.currentTarget.classList.toggle("elements__like_active");
    }

//метод удаления карточки
    deleteCard = () => {
        this.element.remove();
    }

    openImage(event) {
        openPopup(popupImage);
        zoomCardImage(event);
        addListenerCloseByEsc(popupImage);
    }

//Метод навешивания всех слушателей
    setEventListener() {
        //закрасить лайк
        this.element.querySelector(".elements__like").addEventListener("click", this.addLike);
        //просмотреть изображение полностью
        this.element.querySelector(".elements__image").addEventListener("click", this.openImage);
        //функция удаления
        this.element.querySelector(".elements__delete").addEventListener("click", this.deleteCard);
    }

//Основной (публичный) метод создания карточки, в котором мы вызываем нужные методы и наполняем будущую карточку данными из формы.
    createCard() {
        this.element = this._template.cloneNode(true).children[0];
        const imageElement = this.element.querySelector(".elements__image");
        imageElement.src = this._data.link;
        imageElement.alt = this._data.name;
        this.element.querySelector(".elements__text").textContent = this._data.name;
        this.setEventListener();

        return this.element;
    }

}

//добавить карточку на страницу
function addCard(item) {
    const itemCard = new Card(elementTemplate, item);
    elementsList.prepend(itemCard.createCard());
}

//отрисовка стандартных карточек
initialCards.forEach((item) => {
    addCard(item)
});

