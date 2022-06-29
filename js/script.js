import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modalWindow from './modules/modalWindow';
import slider from './modules/slider';
import timer from './modules/timer';
import {showModal} from './modules/modalWindow';
window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(()=> showModal('.modal', modalTimerId), 30000000);
    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    calc();
    cards();
    forms(modalTimerId,'form');
    modalWindow('[data-modal]','.modal', modalTimerId);
    slider({
        container:'.offer__slider',
        prevArrow:'.offer__slider-prev', 
        totalCounter:'#total',
        currentCounter:'#current',
        wrapper:'.offer__slider-wrapper',
        field:'.offer__slider-iner',
        slide:'.offer__slide',
        nextArrow:'.offer__slider-next'
    });
    timer('.timer', '2022-07-01');
});


