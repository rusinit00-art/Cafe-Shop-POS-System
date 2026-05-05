import {customer_db} from '../db/db.js';

class Customer {
    #name; #phone; #email;

    constructor(name, phone, email) {
        this.#name = name;
        this.#phone = phone;
        this.#email = email;
    }

    get name() { return this.#name; }
    get phone() { return this.#phone; }
    get email() { return this.#email; }

    set name(name) { this.#name = name; }
    set phone(phone) { this.#phone = phone; }
    set email(email) { this.#email = email; }
}

export const addCustomerData = (name, phone, email) => {
    customer_db.push(new Customer(name, phone, email));
}

export const updateCustomerData = (name, phone, email) => {
    let obj = customer_db.find(c => c.phone == phone);
    if(obj) { obj.name = name; obj.email = email; }
}

export const deleteCustomerData = (phone) => {
    let index = customer_db.findIndex(c => c.phone == phone);
    if(index !== -1) customer_db.splice(index, 1);
}

export const getCustomerData = () => customer_db;
export const getCustomerDataByPhone = (phone) => customer_db.find(c => c.phone == phone);