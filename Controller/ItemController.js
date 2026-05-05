import { addItemData, getItemData } from '../Model/ItemModel.js';
import { renderPOSGrid } from './OrderController.js';

const loadItemTbl = () => {
    $('#item-table-body').empty();
    getItemData().forEach((item, i) => {
        $('#item-table-body').append(`<tr onclick="loadItemForm(${i})" style="cursor:pointer">
            <td><img src="${item.url}" width="40"></td><td>${item.name}</td><td>${item.price}</td><td>Edit</td>
        </tr>`);
    });
};

window.addItem = () => {
    let name = $('#item-name').val();
    let price = $('#item-price').val();
    let url = $('#item-img').val();
    if(name && price) {
        addItemData(name, price, url);
        loadItemTbl();
        renderPOSGrid();
        $('#item-name,#item-price,#item-img').val('');
    }
};

window.loadItemForm = (i) => {
    let data = getItemData();
    $('#item-name').val(data[i].name);
    $('#item-price').val(data[i].price);
    $('#item-img').val(data[i].url);
};

$(document).ready(() => loadItemTbl());