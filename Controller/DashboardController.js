import { renderPOSGrid } from './OrderController.js';

window.view = (id) => {
    $('.spa-view').hide();
    $('#' + id).show();
    if (id === 'dash') renderPOSGrid();
};

$(document).ready(() => {
    window.view('dash');
});