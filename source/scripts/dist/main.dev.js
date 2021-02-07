"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.body = exports.doneColum = exports.inProgressColum = exports.todoColum = exports.doneBody = exports.inProgressBody = exports.todoBody = void 0;

require("../scss/main.scss");

var _createDomElements = require("./createDomElements.js");

var _createTaskData = require("./createTaskData.js");

var _modal = require("./modal.js");

// import * as $ from 'jquery'
// import '../css/main.css'
var boardCanvas = document.querySelector('.board-canvas');
var btnCreateForm = document.getElementById('create-form');
var todoBody = document.getElementById('todo-body');
exports.todoBody = todoBody;
var inProgressBody = document.getElementById('in-progress-body');
exports.inProgressBody = inProgressBody;
var doneBody = document.getElementById('done-body');
exports.doneBody = doneBody;
var todoColum = document.querySelector('.colum--todo');
exports.todoColum = todoColum;
var inProgressColum = document.querySelector('.colum--in-progress');
exports.inProgressColum = inProgressColum;
var doneColum = document.querySelector('.colum--done');
exports.doneColum = doneColum;
var body = document.querySelector('body');
exports.body = body;
window.addEventListener('load', (0, _createTaskData.renderTask)(todoBody, 'task'));
window.addEventListener('load', (0, _createTaskData.renderTask)(inProgressBody, 'in-prog-task'));
window.addEventListener('load', (0, _createTaskData.renderTask)(doneBody, 'done')); // To Do

todoColum.addEventListener('click', function (event) {
  event.preventDefault();

  if (event.target.id === 'create-form') {
    (0, _createDomElements.createForm)();
    btnCreateForm.disabled = true;
  }

  if (event.target.id === 'create-task') {
    (0, _createTaskData.createNewUser)();
    (0, _createDomElements.deleteDomElement)('[task-form-wrp]');
    btnCreateForm.disabled = false;
    (0, _createTaskData.counterTask)(todoColum, 'task');
  }

  if (event.target.id === 'delete-task-form') {
    (0, _createDomElements.deleteDomElement)('[task-form-wrp]');
    btnCreateForm.disabled = false;
  }

  if (event.target.id === 'delete') {
    var idx = event.target.closest('.card');
    (0, _createTaskData.deleteTask)(idx.id, 'task');
    idx.remove();
    (0, _createTaskData.counterTask)(todoColum, 'task');
  }

  if (event.target.id === 'remove-inprog') {
    var inProgressTask = (0, _createTaskData.getTaskFromLocalStorage)('in-prog-task').length;

    if (inProgressTask < 6) {
      var _idx = event.target.closest('.card');

      (0, _createTaskData.transferTask)(_idx.id, 'task', 'in-prog-task');

      _idx.remove();

      inProgressBody.innerHTML = '';
      (0, _createTaskData.renderTask)(inProgressBody, 'in-prog-task');
      (0, _createTaskData.counterTask)(todoColum, 'task');
    } else {
      (0, _modal.createModal)(_modal.modalMessege.limitTaskInProgress);
    }
  }

  if (event.target.id === 'clear-all') {
    (0, _modal.createModal)(_modal.modalMessege.clearTodo, todoBody);
  }
}); // In Progress

inProgressColum.addEventListener('click', function (event) {
  event.preventDefault();

  if (event.target.id === 'delete') {
    // createModal(modalMessege.deleteInProgress)
    var idx = event.target.closest('.card');
    (0, _createTaskData.deleteTask)(idx.id, 'in-prog-task');
    idx.remove();
    (0, _createTaskData.counterTask)(inProgressColum, 'in-prog-task');
  }

  if (event.target.id === 'remove-inprog') {
    var _idx2 = event.target.closest('.card');

    (0, _createTaskData.transferTask)(_idx2.id, 'in-prog-task', 'done');

    _idx2.remove();

    doneBody.innerHTML = '';
    (0, _createTaskData.renderTask)(doneBody, 'done');
    (0, _createTaskData.counterTask)(inProgressColum, 'in-prog-task');
  }

  if (event.target.id === 'clear-all') {
    (0, _modal.createModal)(_modal.modalMessege.clearInProgress, inProgressBody);
    (0, _createTaskData.counterTask)(inProgressColum, 'in-prog-task');
  }
}); // Done

doneColum.addEventListener('click', function (event) {
  event.preventDefault();

  if (event.target.id === 'delete') {
    var idx = event.target.closest('.card');
    (0, _createTaskData.deleteTask)(idx.id, 'done');
    idx.remove();
    (0, _createTaskData.counterTask)(doneColum, 'done');
  }

  if (event.target.id === 'remove-inprog') {
    var _idx3 = event.target.closest('.card');

    (0, _createTaskData.transferTask)(_idx3.id, 'done', 'task');

    _idx3.remove();

    todoBody.innerHTML = '';
    (0, _createTaskData.renderTask)(todoBody, 'task');
    (0, _createTaskData.counterTask)(doneColum, 'done');
  }

  if (event.target.id === 'clear-all') {
    (0, _modal.createModal)(_modal.modalMessege.clearDone, doneBody);
    (0, _createTaskData.counterTask)(doneColum, 'done');
  }
});
document.addEventListener('click', function (event) {
  event.preventDefault();
  var modal = document.querySelector('.modal-message__text');

  if (event.target.id === 'modal-no') {
    (0, _createDomElements.deleteDomElement)('[modal]');
    body.classList.remove('body-lock');
  }

  if (event.target.id === 'modal-ok') {
    if (modal.innerText == _modal.modalMessege.clearTodo) {
      todoBody.innerHTML = '';
      localStorage.removeItem('task');
      (0, _createTaskData.counterTask)(todoColum, 'task');
    }

    if (modal.innerText == _modal.modalMessege.clearInProgress) {
      inProgressBody.innerHTML = '';
      localStorage.removeItem('in-prog-task');
      (0, _createTaskData.counterTask)(inProgressColum, 'in-prog-task');
    }

    if (modal.innerText == _modal.modalMessege.clearDone) {
      doneBody.innerHTML = '';
      localStorage.removeItem('done');
      (0, _createTaskData.counterTask)(doneColum, 'done');
    }

    if (modal.innerText == _modal.modalMessege.limitTaskInProgress) {
      (0, _createDomElements.deleteDomElement)('[modal]');
      body.classList.remove('body-lock');
    }

    (0, _createDomElements.deleteDomElement)('[modal]');
    body.classList.remove('body-lock');
  }
});
boardCanvas.addEventListener("keydown", function (event) {
  if (event.keyCode == 27) {
    (0, _createDomElements.deleteDomElement)('[modal]');
    body.classList.remove('body-lock');
    console.log('kek');
  }
});