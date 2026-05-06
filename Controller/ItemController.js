import { addItemData, updateItemData, deleteItemData, getItemData, getItemDataByName } from '../Model/ItemModel.js';
import { renderPOSGrid } from './OrderController.js';
import { validatePrice } from '../Utils/regex_util.js';

const loadItemTbl = () => {
    $('#item-table-body').empty();
    let item_list = getItemData();

    item_list.forEach((item) => {
        let new_row = `<tr> 
            <td><img src="${item.url}" width="40" height="40" class="rounded shadow-sm" onerror="this.src='https://via.placeholder.com/50'"></td> 
            <td class="fw-bold">${item.name}</td> 
            <td class="text-success fw-bold">LKR ${item.price}</td> 
            <td><button class="btn btn-sm btn-light border edit-item-btn"><i class="fas fa-edit"></i></button></td>
        </tr>`;
        $('#item-table-body').append(new_row);
    });
}

$('#item-table-body').on('click', 'tr', function () {
    let name = $(this).children('td:eq(1)').text();
    let item_obj = getItemDataByName(name);

    if (item_obj) {
        $('#item-name').val(item_obj.name);
        $('#item-price').val(item_obj.price);
        $('#item-img').val(item_obj.url);
    }
});
// --- add---
$('#btn-add-item').on('click', function () {
    let name = $('#item-name').val();
    let price = $('#item-price').val();
    let url = $('#item-img').val();

    (name == "") ? Swal.fire("Error", "Item Name is required!", "error") :
        (getItemDataByName(name)) ? Swal.fire("Error", "Item already exists!", "error") :
            (price == "" || !validatePrice(price)) ? Swal.fire("Error", "Invalid Price!", "error") :
                (url == "") ? Swal.fire("Error", "Image URL is required!", "error") :
                    (() => {
                        addItemData(name, price, url);
                        Swal.fire("Success", "Item added to menu!", "success");
                        loadItemTbl();
                        renderPOSGrid();
                        $('#item-name, #item-price, #item-img').val("");
                    })();
});

// --- (Update---
$('#btn-update-item').on('click', function () {
    let name = $('#item-name').val();
    let price = $('#item-price').val();
    let url = $('#item-img').val();

    (name == "") ? Swal.fire("Error", "Select an item to update!", "error") :
        (!(getItemDataByName(name))) ? Swal.fire("Error", "Item not found!", "error") :
            (!validatePrice(price)) ? Swal.fire("Error", "Invalid Price!", "error") :
                (() => {
                    updateItemData(name, price, url);
                    Swal.fire("Updated!", "Item details changed.", "success");
                    loadItemTbl();
                    renderPOSGrid();
                    $('#item-name, #item-price, #item-img').val("");
                })();
});

// ---Delete---
$('#btn-delete-item').on('click', function () {
    let name = $('#item-name').val();

    if (name == "") return Swal.fire("Error", "Select an item first!", "error");

    Swal.fire({
        title: "Are you sure?",
        text: "Remove this item from Brewster Cafe?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItemData(name);
            Swal.fire("Deleted!", "Item removed.", "success");
            loadItemTbl();
            renderPOSGrid();
            $('#item-name, #item-price, #item-img').val("");
        }
    });
});

$(document).ready(() => loadItemTbl());