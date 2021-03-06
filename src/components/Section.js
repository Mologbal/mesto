export default class Section {
    constructor({
        items,
        renderer
    }, containerSelector) {
        this._renderedItems = items; //это массив данных, которые нужно добавить на страницу при инициализации класса
        this._renderer = renderer; //это функция, отвечающая за создание и отрисовку данных на странице
        this._container = document.querySelector(containerSelector); //селектор контейнера, в который нужно добавлять созданные элементы.
    }

    //отрисовка всех элементов
    initialItems(items) {
        items.reverse().forEach(item => this._renderer(item));
    }

    //добавит в контейнер
    addItem(element) {
        this._container.prepend(element);
    }
}