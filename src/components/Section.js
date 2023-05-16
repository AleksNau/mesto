export default class Section {
    constructor(items, renderer, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._conteiner = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach((item) => this._renderer(item));
    }

//принимает DOM-элемент и добавляет его в контейнер
    addItem(item) {
        this._conteiner.prepend(item);
    }
}