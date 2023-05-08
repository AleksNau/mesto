export default class Section {
    constructor(items, renderer,conteinerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._conteiner = conteinerSelector;
    }

    defoultItems() {
        this._items.forEach((item) => {
            const cardItem = this._renderer(item);
            this._conteiner.prepend(cardItem);
        });
    }

    addItem() {
//принимает DOM-элемент и добавляет его в контейнер
        const cardItem = this._renderer(this._items);
        this._conteiner.prepend(cardItem);

    }
}