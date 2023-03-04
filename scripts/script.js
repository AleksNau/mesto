const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

const popupOpen = function () {
    popupElement.classList.add('popup_is-opened');
}

const popupClose = function () {
    popupElement.classList.remove('popup_is-opened');
}

const popupCloseByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget){
        return;
    }
    popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popupElement.addEventListener('click',popupCloseByClickOnOverlay);