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
        this._submit(this.card, this.delId);
    }

}