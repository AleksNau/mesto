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

class popupFormClass {
    constructor(formSelector, onAddItem) {
        this.formSelector = formSelector;
        this._onAddItem = onAddItem;

      this.formSelector.addEventListener("submit", this._onSubmit);
    }

    _onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        this._onAddItem(data);
    }
}




class Card {
    constructor(data,list) {
        this._data = data;
        this._list = list;

    }

    createCard(item) {
        this._card = elementTemplate.cloneNode(true).children[0];//children[0]
        this._imageElement =  this._card.querySelector(".elements__image");
        this._imageElement.src = item.link;
        this._imageElement.alt = item.name;
        this._card.querySelector(".elements__text").textContent = item.name;
        setEventListener(this._card);

        return this._card;
    }

    getCard(){
        this.createCard(this._data);
        return this._card;
    }
}
//лист элементов
class elementsListClass {
    constructor(conteinerSelector) {
        this._container =conteinerSelector;
    }

    addCard(item) {
        elementsList.prepend(createCard(item));
    }
    defRen() {
        const rep = Array.from(this._container)
        rep.forEach(this.addCard);
    }
}

const newElementsList = new elementsListClass(elementsList);
const newCardForm = new popupFormClass(popupFormAdd, (data) => {
    const newItem = new Card(data,newElementsList);
    const card = newItem.getCard();
    newElementsList.addCard(card);
});








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

const newListList = new elementsListClass(initialCards);
//Отрисовка элеметов списка
newListList.defRen();

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
    //тут нужно создать новый объект карточки
    const newListItem = Object.fromEntries(new FormData(event.target));
    const buttonSubmit = popupFormAdd.querySelector('.popup__submit');
    newElementsList.addCard({name: inputPlace.value, link: inputLink.value});


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




