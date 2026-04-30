import {customer_db} from '../db/db.js';

export class Customer {
    #name;
    #phone;

    constructor(name, phone) {
        this.#name = name;
        this.#phone = phone;
    }

    get name() { return this.#name; }
    get phone() { return this.#phone; }

    set name(name) { this.#name = name; }
    set phone(phone) { this.#phone = phone; }
}

export const addCustomerData = (name, phone) => {
    customer_db.push(new Customer(name, phone));
}

export const updateCustomerData = (phone, name) => {
    let obj = customer_db.find(c => c.phone == phone);
    if(obj) { obj.name = name; }
}

export const deleteCustomerData = (phone) => {
    let index = customer_db.findIndex(c => c.phone == phone);
    if(index !== -1) customer_db.splice(index, 1);
}

export const getCustomerData = () => customer_db;