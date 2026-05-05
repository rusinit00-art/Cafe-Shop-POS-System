import { renderPOSGrid, loadOrderHistory } from './OrderController.js';


window.view = (id) => {
    $('.spa-view').hide();
    $('#' + id).show();
    if (id === 'dash') renderPOSGrid();
    if (id === 'bills') loadOrderHistory();
};


window.openAuth = (type) => {
    $('#authTitle').text(type === 'login' ? "Staff Login" : "Staff Registration");
    $('#authModal').modal('show');
}


window.processAuth = () => {
    let username = $('#auth-user').val();
    let password = $('#auth-pass').val();

    if(username === 'RUSINI' && password === '2005') {
        Swal.fire({
            icon: 'success', title: 'Welcome back!', text: 'Login Successful',
            timer: 1500, showConfirmButton: false
        });
        $('#authModal').modal('hide');
        $('#auth-cards-area').fadeOut();
        $('#auth-user').val(''); $('#auth-pass').val('');
    } else {
        Swal.fire("Error", "Invalid Username or Password!", "error");
    }
}


window.logout = () => {
    Swal.fire({
        title: 'Are you sure?', text: "You will be logged out!", icon: 'warning',
        showCancelButton: true, confirmButtonColor: '#5e3023', confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
        if (result.isConfirmed) { location.reload(); }
    })
}

$(document).ready(() => { window.view('dash'); });