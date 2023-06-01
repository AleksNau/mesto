import PopupWithForm from "./PopupWithForm.js";

export default class PopupRemove extends PopupWithForm {
    constructor(popupSelector, submit) {
        super(popupSelector, submit);
        this.open = this.open.bind(this);
    }

    open(card, id) {
        super.open();
        this.card = card;
        this.delId = id;
    }

    submitForm = (event) => {
        event.preventDefault();
        this.renderLoading("Сохранение...")
        this._submit(this.card, this.delId);
    }

    renderLoading(text = 'Да') {
        this._submitButton.textContent = text;
    };

}