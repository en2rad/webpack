import { select } from './getUserData.js';
import { todoBody } from './main.js';


export function createForm() {
    todoBody.insertAdjacentHTML('beforeEnd', 
        `<div task-form-wrp class="colum__item card">
            <form task-form id="create-card" class="card__form" action="#">
                <div class="card__header card__header--form"></div>
                <div class="card__body">
                    <label class="card__label">Task title</label>
                    <input task-title class="card__input" type="text">

                    <label class="card__label">Task</label>
                    <textarea task-text class="card__textarea" id="cf-message" type="text"></textarea>
                </div>
                <div class="card__footer">
                    <button id="create-task" class="card__btn btn-primary">Create</button>
                    <button id="delete-task-form" class="card__btn btn-primary">Delete</button>
                </div>
            </form>
        </div>`
    );

    // вставляю список
    let header = todoBody.querySelector('.card__header--form')
    header.appendChild(select)
}


export function deleteDomElement(el) {
    document.querySelector(el).remove();
}


 


