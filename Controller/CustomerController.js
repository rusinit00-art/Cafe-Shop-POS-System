import { addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData } from '../Model/CustomerModel.js';
import { check_phone } from '../Utils/regex_util.js';

const loadCustomerTbl = () => {
    $('#ct').empty();
    getCustomerData().forEach((c, i) => {
        $('#ct').append(`<tr onclick="loadCustForm(${i})" style="cursor:pointer">
            <td>${c.name}</td><td>${c.phone}</td><td>${c.email || 'N/A'}</td><td>Edit</td>
        </tr>`);
    });
};

window.saveC = () => {
    let name = $('#cn').val();
    let phone = $('#cp').val();
    let email = $('#c-email').val();

    if (!check_phone(phone)) return Swal.fire("Error", "Invalid Phone Number!", "error");

    addCustomerData(name, phone, email);
    loadCustomerTbl();
    Swal.fire("Saved", "Customer Registered", "success");
    $('#cn,#cp,#c-email').val('');
};

window.loadCustForm = (i) => {
    let data = getCustomerData();
    $('#cn').val(data[i].name);
    $('#cp').val(data[i].phone);
    $('#c-email').val(data[i].email);
};

$(document).ready(() => loadCustomerTbl());