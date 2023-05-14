import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector(".popup__form");
    }

//собирает данные всех полей формы
    _getInputValues() {
        this._data = Object.fromEntries(new FormData(this._form));
        return this._data;
    }

//добавить сабмит
    setEventListeners() {
        this._button = this._popup.querySelector(".popup__close-button");
        this._button.addEventListener('click', () => this.close());
        this._form.addEventListener('submit', this.submitForm);//функция обработчик колбэк сабмита
    }

    //обнулять еще
    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
        this._form.reset();
    }

    submitForm = (event) => {
        this._submit(event, this._getInputValues());
        this.close();
    }
}