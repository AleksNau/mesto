export default class Section {
    constructor(items, renderer, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._conteiner = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach((item) => {
            this.addItem(item)
        });
    }

//принимает DOM-элемент и добавляет его в контейнер
    addItem(item) {
        const cardItem = this._renderer(item);
        this._conteiner.prepend(cardItem);
    }
}