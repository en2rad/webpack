import { select } from './getUserData.js';
import { todoBody } from './main.js';
import { inProgressBody } from './main.js';
import { doneBody } from './main.js'
import { createModal } from './modal.js';

class Task {
    constructor(options) {
        this.id = getId()
        this.name = options.name
        this.title = options.title
        this.text = options.text
        this.date = options.date
        this.comment = options.comment
	}
}

function getDateNow() {
   	let  result = new Date().toLocaleDateString() 
    return result;
}

function getId() {
    return Math.random().toLocaleString(36).substr(2, 16);
}

export function createNewUser() {
	const taskForm = document.querySelector("[task-form]");

	const taskUserNameValue = select.options[select.selectedIndex].value
	const taskTitle = taskForm.querySelector("[task-title]");
	const taskText = taskForm.querySelector("[task-text]");
	
    const taskTitleValue = taskTitle.value
	const taskTextValue = taskText.value

    if (taskTitleValue.length !== 0 && taskTextValue.length !== 0) {
        let task = new Task({
            name: taskUserNameValue,
            title: taskTitleValue,	
            text: taskTextValue,
            date: getDateNow(),
        })
        
	    addToLocalStorage(task,'task')
	    createTask(todoBody,task)

    } 
    else if (taskTitleValue.length === 0 && taskTextValue.length === 0){
        taskTitle.style.border = '2px solid red'
        taskText.style.border = '2px solid red'
        taskForm.display.block
    } else if (taskTitleValue.length === 0) {
        taskTitle.style.border = '2px solid red'
        taskForm.display.block
        
    } else if (taskTextValue.length === 0){
        taskText.style.border = '2px solid red'
        taskForm.display.block
    }
}

export function createTask(el,user) {
    el.insertAdjacentHTML('beforeEnd', 
    `<div id="${user.id}" class="colum__item card">	
        <div class="card__header">
            <h4 class="card__user-name">${user.name}</h4>
            <span class="card__create-date">${getDateNow()}</span>
        </div>
        <div class="card__body">
            <h4 class="card__title">${user.title}</h4>
            <p class="card__text">
              ${user.text}
            </p>
        </div>
        <div class="card__footer">
            <button id="delete" delete  class="card__btn btn-primary">Delete</button>
            <button id="remove-inprog" class="card__btn btn-primary">></button>
        </div>
    </div>`
    );
}

function addToLocalStorage(task,key) {
	const all = getTaskFromLocalStorage(key)
	all.push(task)
	localStorage.setItem(key, JSON.stringify(all))
}

export function getTaskFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key) || '[]')
}

export function transferTask(id, key, key2) {
    const todoData = getTaskFromLocalStorage(key)
    const card = todoData.find((el) => el.id === id)
    addToLocalStorage(card,key2)
    deleteTask(id,key)
}

export function deleteTask(id, key) {
    const todoData = getTaskFromLocalStorage(key)
    const idx = todoData.findIndex( (el) => el.id === id  )
    const newArray = [...todoData.slice(0,idx), ...todoData.slice(idx+1)]
    localStorage.setItem(key, JSON.stringify(newArray))
}


export function renderTask(el,key) {
    const task = getTaskFromLocalStorage(key)
    
    task.length
      ? task.forEach(element => createTask(el,element))
      : null;

    counterTask(el.parentElement,key)
}

export function counterTask(el,key) {
    const elment = el.querySelector('.colum__counter')
    const indx = getTaskFromLocalStorage(key).length
    elment.innerHTML = indx
}
