import Popup from "./Popup";

export default class PopupRemove extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector(".popup__form");
        this._submit= this._submit.bind(this)
        this.open=this.open.bind(this);
    }

    open(card,id) {
        super.open();
        this.card= card;
        this.delId =id;
    }

//добавить сабмит
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',(event) => {
            event.preventDefault();
            this._submit(this.card, this.delId);
            this.close();
        } );
    }
    close() {
        super.close();
        this._form.reset();
    }

}