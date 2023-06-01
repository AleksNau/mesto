import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector(".popup__form");
        this._submitButton = this._form.querySelector('.popup__submit')
        this.open = this.open.bind(this);
    }

    //собирает данные всех полей формы
    _getInputValues() {
        this._data = Object.fromEntries(new FormData(this._form));
        return this._data;
    }

    //добавить сабмит
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            this.submitForm(event);
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(text = 'Сохранить') {
        this._submitButton.textContent = text;
    };

    submitForm = (event) => {
        this.renderLoading("Сохранение...")
        event.preventDefault();
        this._submit(this._getInputValues());
    }
}