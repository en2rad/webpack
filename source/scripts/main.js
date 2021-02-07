// import * as $ from 'jquery'
import '../scss/main.scss'
// import '../css/main.css'

import { createForm } from './createDomElements.js';
import { deleteDomElement } from './createDomElements.js';


import { createNewUser } from './createTaskData.js';
import { counterTask } from './createTaskData.js';
import { renderTask } from './createTaskData.js';
import { deleteTask } from './createTaskData.js';
import { transferTask } from './createTaskData.js';
import { getTaskFromLocalStorage } from './createTaskData.js';

import { createModal } from './modal.js';
import { modalMessege } from './modal.js';

const boardCanvas = document.querySelector('.board-canvas');    
const btnCreateForm = document.getElementById('create-form')

export const todoBody = document.getElementById('todo-body')
export const inProgressBody = document.getElementById('in-progress-body')
export const doneBody = document.getElementById('done-body')

export const todoColum = document.querySelector('.colum--todo')
export const inProgressColum = document.querySelector('.colum--in-progress')
export const doneColum = document.querySelector('.colum--done')


export const body = document.querySelector('body')

window.addEventListener('load', renderTask(todoBody,'task'))
window.addEventListener('load', renderTask(inProgressBody,'in-prog-task'))
window.addEventListener('load', renderTask(doneBody,'done'))


// To Do
todoColum.addEventListener('click', (event) => {
    event.preventDefault();
    
    if(event.target.id === 'create-form') {
        createForm();
        btnCreateForm.disabled = true; 
    } 

    if(event.target.id === 'create-task') {
        createNewUser();
        deleteDomElement('[task-form-wrp]');
        btnCreateForm.disabled = false; 

        counterTask(todoColum,'task')
    } 


    if(event.target.id === 'delete-task-form') {
        deleteDomElement('[task-form-wrp]');
        btnCreateForm.disabled = false; 
    } 

    if(event.target.id === 'delete'){
        let idx = event.target.closest('.card');
        deleteTask(idx.id,'task')
        idx.remove()

        counterTask(todoColum,'task')
    } 

    if(event.target.id === 'remove-inprog'){
        const inProgressTask = getTaskFromLocalStorage('in-prog-task').length
        if(inProgressTask < 6) {
            let idx = event.target.closest('.card');
            transferTask(idx.id,'task','in-prog-task')
            idx.remove()

            inProgressBody.innerHTML = ''
            renderTask(inProgressBody,'in-prog-task')

            counterTask(todoColum,'task')
        } else {
            createModal(modalMessege.limitTaskInProgress)
        }
    } 

    if(event.target.id === 'clear-all') {
        createModal(modalMessege.clearTodo,todoBody)
    } 
});

// In Progress
inProgressColum.addEventListener('click', (event) => {
    event.preventDefault();

    if(event.target.id === 'delete'){
        // createModal(modalMessege.deleteInProgress)
        let idx = event.target.closest('.card');
        deleteTask(idx.id,'in-prog-task')
        idx.remove()

        counterTask(inProgressColum,'in-prog-task')
    } 

    if(event.target.id === 'remove-inprog'){
        let idx = event.target.closest('.card');
        transferTask(idx.id,'in-prog-task','done')
        idx.remove()

        doneBody.innerHTML = ''
        renderTask(doneBody,'done')

        counterTask(inProgressColum,'in-prog-task')
    } 

    if(event.target.id === 'clear-all') {
        createModal(modalMessege.clearInProgress, inProgressBody)
        counterTask(inProgressColum,'in-prog-task')
    } 
});

// Done
doneColum.addEventListener('click', (event) => {
    event.preventDefault();

    if(event.target.id === 'delete'){
        let idx = event.target.closest('.card');
        deleteTask(idx.id,'done')
        idx.remove()

        counterTask(doneColum,'done')
    } 

    if(event.target.id === 'remove-inprog'){
        let idx = event.target.closest('.card');
        transferTask(idx.id,'done','task')
        idx.remove()


        todoBody.innerHTML = ''
        renderTask(todoBody,'task')

        counterTask(doneColum,'done')
    } 

    if(event.target.id === 'clear-all'){
        createModal(modalMessege.clearDone,doneBody)

        counterTask(doneColum,'done')
    } 
});




document.addEventListener('click', (event) => {
    event.preventDefault();
    const modal = document.querySelector('.modal-message__text')

    if(event.target.id === 'modal-no'){
        deleteDomElement('[modal]')
        body.classList.remove('body-lock')
    } 

    if(event.target.id === 'modal-ok') {
        if (modal.innerText ==  modalMessege.clearTodo) {
            todoBody.innerHTML = '';
            localStorage.removeItem('task')

            counterTask(todoColum,'task')
        }
        if (modal.innerText ==  modalMessege.clearInProgress) {
            inProgressBody.innerHTML = '';
            localStorage.removeItem('in-prog-task')

             counterTask(inProgressColum,'in-prog-task')
        }

        if (modal.innerText ==  modalMessege.clearDone) {
            doneBody.innerHTML = '';
            localStorage.removeItem('done')

            counterTask(doneColum,'done')
        }


        if (modal.innerText == modalMessege.limitTaskInProgress) {
            deleteDomElement('[modal]')
            body.classList.remove('body-lock')
        }

        deleteDomElement('[modal]')
        body.classList.remove('body-lock')
    }
})




boardCanvas.addEventListener("keydown", function(event) {
    if (event.keyCode == 27) {
        deleteDomElement('[modal]')
        body.classList.remove('body-lock')
        console.log('kek')
    }    
});