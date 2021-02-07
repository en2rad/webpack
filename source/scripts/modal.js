import { body } from './main.js';

export const modalMessege = {
    clearTodo: 'Clear column To do?',
	clearInProgress: 'Clear column In progress?',
	clearDone: 'Clear column Done?',
    deleteInProgress: 'Вы действительно хотите удалить текст из In progress',
    limitTaskInProgress: 'Выполните одно из заданий в in progress',
}

export function createModal(message) {
    body.classList.add('body-lock')

    body.insertAdjacentHTML('beforeEnd', 
        `<div modal class="modal-message-wrp">
            <div class="modal-message">
                <p class="modal-message__text">
                    ${message}
                </p>
                <div class="modal-message__btn-wrap">
                    <button id="modal-no" modal-no class="modal-message__btn btn-primary">No</button>
                    <button id="modal-ok" class="modal-message__btn btn-primary">Ok</button>
                </div>
            </div>
        </div>
        `
    );
}




