import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector(".popup__form");
        this.open=this.open.bind(this);
    }

//собирает данные всех полей формы
    _getInputValues() {
        this._data = Object.fromEntries(new FormData(this._form));
        return this._data;
    }

//добавить сабмит
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit',(event) => {
            this.submitForm(event);
            this.close();
        } );//функция обработчик колбэк сабмита
        super.clickByOverlay();
    }
    close() {
        super.close();
        this._form.reset();
    }

    submitForm = (event) => {
        event.preventDefault();
        this._submit(this._getInputValues());
        this._form.reset();
    }

}