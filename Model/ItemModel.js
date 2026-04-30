import {item_db} from '../db/db.js';

export class Item {
    #name;
    #price;
    #url;

    constructor(name, price, url) {
        this.#name = name;
        this.#price = price;
        this.#url = url;
    }

    get name() { return this.#name; }
    get price() { return this.#price; }
    get url() { return this.#url; }

    set name(name) { this.#name = name; }
    set price(price) { this.#price = price; }
    set url(url) { this.#url = url; }
}

export const addItemData = (name, price, url) => {
    item_db.push(new Item(name, price, url));
}

export const deleteItemData = (name) => {
    let index = item_db.findIndex(i => i.name == name);
    if(index !== -1) item_db.splice(index, 1);
}

export const getItemData = () => item_db;