import { validateName } from '../Utils/regex_util.js';
$(document).ready(() => {
    let currentShop = $('#shop-name-display').text().trim();
    let currentOwner = $('#owner-name-display').text().replace("Owner: ", "").trim();

    $('#snm').val(currentShop);
    $('#onm').val(currentOwner);
});

//-- Changes --
$('#btn-save-settings').on('click', function () {
    let newShopName = $('#snm').val();
    let newOwnerName = $('#onm').val();
    (newShopName === "") ? Swal.fire("Error", "Shop Name required!", "error") :
        (newOwnerName === "") ? Swal.fire("Error", "Owner Name required!", "error") :
            (!validateName(newOwnerName)) ? Swal.fire("Error", "Invalid Owner Name!", "error") :
                (() => {
                    $('#shop-name-display').text(newShopName);
                    $('#owner-name-display').text("Owner: " + newOwnerName);

                    Swal.fire({
                        icon: 'success',
                        title: 'Settings Saved!',
                        text: 'System profile updated successfully.',
                        timer: 1500,
                        showConfirmButton: false
                    });
                })();
});