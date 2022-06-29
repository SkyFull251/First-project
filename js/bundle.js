/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    const result = document.querySelector('.calculating__result span');
    let sex, height , weight , age , ratio;
    
    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initocalSetting (selector, activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }
    initocalSetting ('#gender div', 'calculating__choose-item_active');
    initocalSetting ('.calculating__choose_big div', 'calculating__choose-item_active');
    function calcTotal (){
        if(!sex || !height || !weight || !age || !ratio ){
            result.textContent = '____';
            return;
        }
        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal ();

    function getStaticInformation (selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e)=> {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
    
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', ()=>{
            if(input.value.match(/\D/g)){
                input.style.border = '2px solid red';
            }else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight': 
                    weight = +input.value;
                    break;
                case 'age': 
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards (){
    class MenuItem {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.clases = classes;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = Math.floor(this.price * this.transfer);
        }

        render() {
            const element = document.createElement('div');
            if(this.clases.length > 0 ){
                this.clases.forEach( myClasses => element.classList.add(myClasses));
            }else{
                element.classList.add('menu__item');
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);

        }
    }
    

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg , title, descr, price}) => {
            new MenuItem(img, altimg , title, descr, price, '.menu .container').render();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalWindow */ "./js/modules/modalWindow.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(modalTimerId, formSelector){
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/spinner.svg',
        success: ' thanks',
        failure: 'Eror'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

   

    function bindPostData(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                updateModalWindow(message.success);
                statusMessage.remove();
            }).catch(()=>{
                updateModalWindow(message.failure);
            }).finally(()=>{
                form.reset();
            });
        });
    }

    function updateModalWindow (message){
        const modalContent = document.querySelector('.modal__dialog');
        modalContent.classList.add('hide');
        modalContent.classList.remove('show');
        (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);
        const newContentModal = document.createElement('div');
        newContentModal.classList.add('modal__dialog');
        newContentModal.innerHTML = `
            <div class='modal__content'>
            <div class="modal__close" data-close>×</div>
            <div class='modal__title'>${message}</div>
            </div>
        
        `;
        document.querySelector('.modal').append(newContentModal);

        setTimeout(()=>{
            newContentModal.remove();
            modalContent.classList.remove('hide');
            modalContent.classList.add('show');
            (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        },4000);

    }

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modalWindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalWindow.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function showModal(modalSelector,modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTimerId);
    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}

function modalWindow(triggerSelector, modalSelector,modalTimerId ){
    const modalWindow = document.querySelector(modalSelector);
    const modalButt = document.querySelectorAll(triggerSelector);

    modalButt.forEach((val) => {
        val.addEventListener('click', () => showModal(modalSelector,modalTimerId));
    });
    
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 100) {
            showModal(modalSelector,modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    const sliders = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          sliderPrev = document.querySelector(prevArrow),
          sliderNext = document.querySelector(nextArrow),
          sliderCount = document.querySelector(currentCounter),
          sliderCountTotal = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex =1;
    let offset = 0;
    function deleteNum (str){
        return +str.replace(/\D/g, '');
    }
    function getSliderCounter(){
        if(slideIndex < 10){
            sliderCount.textContent = `0${slideIndex}`;
        }else{
            sliderCount.textContent = slideIndex;
        }
    }
    if(sliders.length< 10){
        sliderCountTotal.textContent = `0${sliders.length}`;
    }else{
        sliderCountTotal.textContent = sliders.length;
    }
    getSliderCounter();

    slidesField.style.width = 100 * sliders.length + "%";
    sliders.forEach(val => val.style.width = width);
    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i =0 ; i< sliders.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if(i==0){
            dot.classList.add('active');
        }
        indicators.append(dot);
        dots.push(dot);
    }

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    function nextSliders(){
        if(offset == deleteNum(width) * (sliders.length -1)){
            offset = 0;
        }else{
            offset += deleteNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == sliders.length){
            slideIndex = 1;
        }else{
            slideIndex++;
        }
        getSliderCounter();
        dots.forEach((dot) => {
            if(dot.classList.contains('active')){
                dot.classList.remove('active');
            }
        });
        dots[slideIndex-1].classList.add('active');
        dots.forEach(dot => {
            dot.addEventListener('click', (e)=>{
                const slideTo = e.target.getAttribute('data-slide-to');
                slideIndex = slideTo;
                offset = deleteNum(width) * (slideTo -1);
                slidesField.style.transform = `translateX(-${offset}px)`;
                
                getSliderCounter();
                dots.forEach((dot) => {
                    if(dot.classList.contains('active')){
                        dot.classList.remove('active');
                    }
                dots[slideIndex-1].classList.add('active');
                });
            });
        });

    }
    sliderNext.addEventListener('click', nextSliders);
    sliderPrev.addEventListener('click', ()=>{
        if(offset == 0){
            offset = deleteNum(width) * (sliders.length -1);
        }else{
            offset -= deleteNum(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(slideIndex == 1){
            slideIndex = sliders.length;
        }else{
            slideIndex--;
        }
        getSliderCounter();
    });
    setInterval(nextSliders,5000);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, classActive){
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(tab => {
            tab.classList.remove(classActive);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');

        tabs[i].classList.add(classActive);
    }
    hideTabContent();
    showTabContent();
    let contInterval = 1;
    setInterval(()=>{
        hideTabContent();
        showTabContent(contInterval);
        if(contInterval >= 3){
            contInterval = 0; 
        }else{
            contInterval++;
        }
    },5000);
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (){
    const deadLine = '2022-07-01';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds;
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const dataServ = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await dataServ.json();
};

const getResource = async (url) => {
    const dataServ = await fetch(url);

    if(!dataServ.ok){
        throw new Error(`Could not fetch ${url}, stutus: ${dataServ.status}`);
    }

    return await dataServ.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modalWindow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modalWindow */ "./js/modules/modalWindow.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(()=> (0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_4__.showModal)('.modal', modalTimerId), 30000000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])(modalTimerId,'form');
    (0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]','.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container:'.offer__slider',
        prevArrow:'.offer__slider-prev', 
        totalCounter:'#total',
        currentCounter:'#current',
        wrapper:'.offer__slider-wrapper',
        field:'.offer__slider-iner',
        slide:'.offer__slide',
        nextArrow:'.offer__slider-next'
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-07-01');
});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map