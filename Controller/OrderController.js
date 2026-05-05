import { getItemData } from '../Model/ItemModel.js';
import { addOrderData, getOrderData } from '../Model/BillModel.js';

let cart = [];

export const renderPOSGrid = () => {
    $('#pos-grid').empty();
    getItemData().forEach((item) => {
        $('#pos-grid').append(`
            <div class="col-md-4 col-lg-3">
                <div class="card p-2 text-center border-0 shadow-sm drinks-card" onclick="addToCart('${item.name}')" style="cursor:pointer">
                    <img src="${item.url}" class="card-img-top" style="height:100px; object-fit:cover">
                    <h6 class="mt-2">${item.name}</h6><small>LKR ${item.price}</small>
                </div>
            </div>`);
    });
};

export const loadOrderHistory = () => {
    $('#bill-table-body').empty();
    let all_orders = getOrderData();

    all_orders.forEach(order => {
        let row = `<tr>
            <td class="fw-bold">${order.id}</td>
            <td>${order.date}</td>
            <td class="fw-bold text-success">LKR ${order.total}</td>
        </tr>`;
        $('#bill-table-body').append(row);
    });
}

window.addToCart = (name) => {
    let item = getItemData().find(i => i.name === name);
    cart.push(item);
    updateUI();
};

const updateUI = () => {
    $('#cart-items-list').empty();
    let total = 0;
    cart.forEach(c => {
        $('#cart-items-list').append(`<div class="d-flex justify-content-between small"><span>${c.name}</span><span>${c.price}</span></div>`);
        total += parseFloat(c.price);
    });
    $('#cart-total').text(total.toFixed(2));
};

window.pay = () => {
    if(cart.length === 0) return Swal.fire("Empty!", "Add items first", "warning");

    let nextCount = getOrderData().length + 1;

    let orderId = "B" + nextCount.toString().padStart(2, '0');

    let orderDate = new Date().toLocaleString();
    let totalAmount = $('#cart-total').text();


    addOrderData(orderId, orderDate, totalAmount);

    loadOrderHistory();
    cart = [];
    updateUI();

    Swal.fire("Paid!", "Bill " + orderId + " Saved Successfully", "success");
};