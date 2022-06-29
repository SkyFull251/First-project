import {closeModal, showModal} from './modalWindow';
import {postData} from '../services/services';
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
            
            postData('http://localhost:3000/requests', json)
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
        showModal('.modal', modalTimerId);
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
            closeModal('.modal');
        },4000);

    }

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}

export default forms;