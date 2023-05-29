import Popup from "./Popup";

export default class PopupRemove extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector(".popup__form");
        this.open=this.open.bind(this);
    }


//добавить сабмит
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',(event) => {
            this.submitForm(event);
            console.log("delete card")
            this.close();
        } );//функция обработчик колбэк сабмита
    }
    close() {
        super.close();
        this._form.reset();
    }

    submitForm = (event) => {
        event.preventDefault();
        console.log(this._submit)
        
    }
}