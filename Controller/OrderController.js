import { getItemData, getItemDataByName } from '../Model/ItemModel.js';
import { addOrderData, getOrderData } from '../Model/BillModel.js';

let cart = [];

export const renderPOSGrid = () => {
    $('#pos-grid').empty();
    getItemData().forEach((item) => {
        let card = `
        <div class="col-md-4 col-lg-3">
            <div class="card drinks-card p-2 text-center" onclick="addToCartClick('${item.name}')">
                <img src="${item.url}" class="card-img-top" style="height:100px; object-fit:cover">
                <h6 class="mt-2">${item.name}</h6><small>LKR ${item.price}</small>
            </div>
        </div>`;
        $('#pos-grid').append(card);
    });
};

window.addToCartClick = (itemName) => {
    let item = getItemDataByName(itemName);
    cart.push(item);
    updateCartUI();
};

const updateCartUI = () => {
    $('#cart-items-list').empty();
    let total = 0;
    cart.forEach(c => {
        $('#cart-items-list').append(`<div class="d-flex justify-content-between small"><span>${c.name}</span><span>${c.price}</span></div>`);
        total += parseFloat(c.price);
    });
    $('#cart-total').text(total.toFixed(2));
};

window.pay = () => {
    let total = $('#cart-total').text();
    if (cart.length === 0) return Swal.fire("Empty!", "Add items first", "warning");
    addOrderData("B"+Date.now(), new Date().toLocaleString(), total);
    cart = [];
    updateCartUI();
    loadBillsTbl();
    Swal.fire("Paid!", "Bill Saved", "success");
};

const loadBillsTbl = () => {
    $('#bt').empty();
    getOrderData().forEach(o => {
        $('#bt').append(`<tr><td>${o.id}</td><td>${o.date}</td><td>${o.total}</td></tr>`);
    });
};

$(document).ready(() => loadBillsTbl());