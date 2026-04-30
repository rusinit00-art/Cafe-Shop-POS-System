window.saveSet = () => {
    let shop = $('#snm').val();
    let owner = $('#onm').val();
    if(shop && owner) {
        $('#shop-name-display').text(shop);
        $('#owner-lbl').text(owner);
        Swal.fire("Success", "Settings Updated!", "success");
    }
};

$(document).ready(() => {
    $('#snm').val($('#shop-name-display').text());
    $('#onm').val($('#owner-lbl').text());
});