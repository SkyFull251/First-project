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

export default modalWindow;
export {closeModal};
export {showModal};