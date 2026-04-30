import {order_db} from '../db/db.js';

export class Order {
    #id;
    #date;
    #total;

    constructor(id, date, total) {
        this.#id = id;
        this.#date = date;
        this.#total = total;
    }

    get id() { return this.#id; }
    get date() { return this.#date; }
    get total() { return this.#total; }
}

export const addOrderData = (id, date, total) => {
    order_db.push(new Order(id, date, total));
}

export const getOrderData = () => order_db;