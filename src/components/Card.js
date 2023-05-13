export default class Card {
    //принимает в себя два параметра
    constructor(templateSelector, data, handleCardClick) {
        this._data = data;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;


    }

//метод навешивания лайка
    #toggleLike () {
        this.classList.toggle("elements__like_active");
    }

//метод удаления карточки
    #deleteCard = () => {
        this.element.remove();
    }


//Метод навешивания всех слушателей
    setEventListener() {
        //закрасить лайк
        this.element.querySelector(".elements__like").addEventListener("click", this.#toggleLike);
        //просмотреть изображение полностью

        this.element.querySelector(".elements__image").addEventListener('click', () => {
            this._handleCardClick(this._data.name, this._data.link)
        });
        //функция удаления
        this.element.querySelector(".elements__delete").addEventListener("click", this.#deleteCard);

    }

//Основной (публичный) метод создания карточки, в котором мы вызываем нужные методы и наполняем будущую карточку данными из формы.
    createCard() {
        this.element = this._template.cloneNode(true).children[0];
        this._cardImage = this.element.querySelector(".elements__image");
        this._cardImage.src = this._data.link;
        this._cardImage.alt = this._data.name;
        this.element.querySelector(".elements__text").textContent = this._data.name;
        this.setEventListener();

        return this.element;
    }

}
