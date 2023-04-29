
import {popupImage, openPopup, zoomCardImage, addListenerCloseByEsc} from './script.js'
export default class Card {
    //принимает в себя два параметра
    constructor(templateSelector, data) {
        this._data = data;
        this._template = templateSelector;
    }

//метод навешивания лайка
    #toggleLike(event) {
        event.currentTarget.classList.toggle("elements__like_active");
    }

//метод удаления карточки
    #deleteCard = () => {
        this.element.remove();
    }

    #openImage(event) {
        openPopup(popupImage);
        zoomCardImage(event);
    }

//Метод навешивания всех слушателей
    setEventListener() {
        //закрасить лайк
        this.element.querySelector(".elements__like").addEventListener("click", this.#toggleLike);
        //просмотреть изображение полностью
        this.element.querySelector(".elements__image").addEventListener("click", this.#openImage);
        //функция удаления
        this.element.querySelector(".elements__delete").addEventListener("click", this.#deleteCard);
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