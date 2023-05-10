import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super();
        this._popup = document.querySelector(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector(".popup__form");
    }

//собирает данные всех полей формы
    _getInputValues(e) {
        this._data = Object.fromEntries(new FormData(e.target));
        return this._data;
    }

//добавить сабмит
    setEventListeners() {
        this._button = this._popup.querySelector(".popup__close-button");
        this._button.addEventListener('click', () => this.close(this._popup));
        this._form.addEventListener('submit', this.submitForm);//функция обработчик колбэк сабмита
    }

    //обнулять еще
    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
    }

    submitForm = (event) => {
        this._submit(event, this._getInputValues(event));
        this.close();
    }
}