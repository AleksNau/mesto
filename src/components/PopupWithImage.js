import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupImage = document.querySelector(".popup_image-zoom");
        this.imageZoomed = this.popupImage.querySelector(".popup__image");
        this.imageText = this.popupImage.querySelector(".popup__place-name");
    }

    open(name, link) {
        super.open();
        this.imageText.textContent = name;//name
        this.imageZoomed.src = link;//устанавливаем ссылку
        this.imageZoomed.alt = name;//устанавливаем подпись картинке name
    }
}