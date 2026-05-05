import { addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData } from '../Model/CustomerModel.js';
import { validateName, validatePhone } from '../Utils/regex_util.js';

const loadTable = () => {
    $('#ct').empty();
    getCustomerData().forEach((c, i) => {
        $('#ct').append(`<tr onclick="loadForm(${i})"><td>${c.name}</td><td>${c.phone}</td><td>${c.email || ''}</td></tr>`);
    });
};

window.saveC = () => {
    let name = $('#cn').val();
    let phone = $('#cp').val();
    if (!validateName(name)) return Swal.fire("Error", "Invalid Name", "error");
    if (!validatePhone(phone)) return Swal.fire("Error", "Invalid Phone", "error");

    addCustomerData(name, phone);
    loadTable();
    $('#cn,#cp,#c-email').val('');
    Swal.fire("Success", "Registered!", "success");
};

window.loadForm = (i) => {
    let c = getCustomerData()[i];
    $('#cn').val(c.name); $('#cp').val(c.phone);
};

