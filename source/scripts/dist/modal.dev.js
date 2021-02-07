"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModal = createModal;
exports.modalMessege = void 0;

var _main = require("./main.js");

var modalMessege = {
  clearTodo: 'Clear column To do?',
  clearInProgress: 'Clear column In progress?',
  clearDone: 'Clear column Done?',
  deleteInProgress: 'Вы действительно хотите удалить текст из In progress',
  limitTaskInProgress: 'Выполните одно из заданий в in progress'
};
exports.modalMessege = modalMessege;

function createModal(message) {
  _main.body.classList.add('body-lock');

  _main.body.insertAdjacentHTML('beforeEnd', "<div modal class=\"modal-message-wrp\">\n            <div class=\"modal-message\">\n                <p class=\"modal-message__text\">\n                    ".concat(message, "\n                </p>\n                <div class=\"modal-message__btn-wrap\">\n                    <button id=\"modal-no\" modal-no class=\"modal-message__btn btn-primary\">No</button>\n                    <button id=\"modal-ok\" class=\"modal-message__btn btn-primary\">Ok</button>\n                </div>\n            </div>\n        </div>\n        "));
}