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
        this._buttonClose.addEventListener('click', () => {
            this.close();
            this._form.reset();
        });
        this._form.addEventListener('submit',(event) => {
            this.submitForm(event);
            this._form.reset();
            this.close();
        } );//функция обработчик колбэк сабмита
        super.clickByOverlay();
    }


    submitForm = (event) => {
        event.preventDefault();
        this._submit(this._getInputValues());
    }

}