import { addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getCustomerDataByPhone } from '../Model/CustomerModel.js';
import { validateName, validatePhone } from '../Utils/regex_util.js';

const loadCustomerTable = () => {
    $('#ct').empty();
    let allCustomers = getCustomerData();
    allCustomers.forEach((customer) => {
        let row = `<tr style="cursor:pointer">
            <td class="fw-bold">${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.email || 'N/A'}</td>
            <td><button class="btn btn-sm btn-light border"><i class="fas fa-edit"></i></button></td>
        </tr>`;
        $('#ct').append(row);
    });
};

const clearForm = () => {
    $('#cn').val(""); $('#cp').val(""); $('#c-email').val("");
};

$('#ct').on('click', 'tr', function () {
    let phoneFromTable = $(this).children('td:eq(1)').text();
    let customerObj = getCustomerDataByPhone(phoneFromTable);
    if (customerObj) {
        $('#cn').val(customerObj.name);
        $('#cp').val(customerObj.phone);
        $('#c-email').val(customerObj.email);
    }
});

// --- Register---
$('#btn-add-customer').on('click', function () {
    let nameVal = $('#cn').val();
    let phoneVal = $('#cp').val();
    let emailVal = $('#c-email').val();

    (nameVal === "") ? Swal.fire("Error", "Name required!", "error") :
        (!validateName(nameVal)) ? Swal.fire("Error", "Invalid Name!", "error") :
            (phoneVal === "") ? Swal.fire("Error", "Phone required!", "error") :
                (!validatePhone(phoneVal)) ? Swal.fire("Error", "Invalid Phone!", "error") :
                    (getCustomerDataByPhone(phoneVal)) ? Swal.fire("Error", "Exists!", "error") :
                        (() => {
                            addCustomerData(nameVal, phoneVal, emailVal);
                            Swal.fire("Success", "Registered!", "success");
                            loadCustomerTable(); clearForm();
                        })();
});

// --- Update ---
$('#btn-update-customer').on('click', function () {
    let nameVal = $('#cn').val();
    let phoneVal = $('#cp').val();
    let emailVal = $('#c-email').val();

    (phoneVal === "") ? Swal.fire("Error", "Select customer!", "error") :
        (!(getCustomerDataByPhone(phoneVal))) ? Swal.fire("Error", "Not Found!", "error") :
            (() => {
                // Model එකේ පිළිවෙළට අනුව (phone, name, email) මෙතන යවන්න ඕනේ
                updateCustomerData(phoneVal, nameVal, emailVal);
                Swal.fire("Updated!", "Details Changed", "success");
                loadCustomerTable(); clearForm();
            })();
});

// --- Delete ---
$('#btn-delete-customer').on('click', function () {
    let phoneVal = $('#cp').val();
    if (phoneVal === "") return Swal.fire("Error", "Select customer!", "error");

    Swal.fire({
        title: "Delete?", text: "Are you sure?", icon: "warning", showCancelButton: true
    }).then((res) => {
        if (res.isConfirmed) {
            deleteCustomerData(phoneVal);
            Swal.fire("Deleted!", "Removed successfully.", "success");
            loadCustomerTable(); clearForm();
        }
    });
});

$(document).ready(() => loadCustomerTable());