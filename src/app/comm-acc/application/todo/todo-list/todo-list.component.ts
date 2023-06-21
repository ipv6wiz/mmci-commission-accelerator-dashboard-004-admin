// Angular Import
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

//project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export default class TodoListComponent {
  // public props
  @ViewChild('defaultClick')
  defaultClick!: ElementRef;
  todoListMessage!: string;
  todo_list_message_error!: boolean;
  todoList: object[] = [];
  toModalList: object[] = [];
  todoCardMessage!: string;
  todo_card_message_error!: boolean;
  newTodoCard;
  newTodoList;
  todoModalMessage!: string;
  todo_modal_message_error!: boolean;
  newTodoModal;

  // constructor
  constructor() {
    this.newTodoCard = '';
    this.newTodoList = '';
    this.newTodoModal = '';
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.todoList.push({ cId: random, msg: 'Lorem Ipsum Dolor Sit Amet' });
    this.todoList.push({ cId: random + 1, msg: 'Industry standard dummy text ever since the 1500s' });
    this.todoList.push({ cId: random + 2, msg: 'The point of using Lorem Ipsum is that it has a more-or-less' });
    this.todoList.push({ cId: random + 3, msg: 'Contrary to popular belief' });
    this.todoList.push({ cId: random + 4, msg: 'Lorem Ipsum Dolor Sit Amet' });
    this.toModalList.push({
      cId1: random + 5,
      msg1: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been'
    });
    this.toModalList.push({
      cId1: random + 6,
      msg1: 'the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley'
    });
    this.toModalList.push({
      cId1: random + 7,
      msg1: 'of type and scrambled it to make a type specimen book. It has survived not only five'
    });
    this.toModalList.push({
      cId1: random + 8,
      msg1: 'centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
    });
  }

  // public method
  addTodoCard() {
    if (this.todoCardMessage === '' || this.todoCardMessage === undefined) {
      this.todo_card_message_error = true;
    } else {
      const html_todo = '<li>' + '<p>' + this.todoCardMessage + '</p>' + '</li>';

      this.newTodoCard = this.newTodoCard + html_todo;
      this.todoCardMessage = '';
    }
  }

  clearAllTodoCardTask() {
    const cardTodoList = document.querySelectorAll('#task-list li');
    for (let i = 0; i < cardTodoList.length; i++) {
      cardTodoList[i].remove();
    }
    this.newTodoCard = '';
  }

  // to do list and to do modal

  addTodoList() {
    if (this.todoListMessage === '' || this.todoListMessage === undefined) {
      this.todo_list_message_error = true;
    } else {
      const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      this.todoList.push({ cId: random, msg: this.todoListMessage });
      this.todoListMessage = '';
    }
  }

  addTodoModal() {
    if (this.todoModalMessage === '' || this.todoModalMessage === undefined) {
      this.todo_modal_message_error = true;
    } else {
      const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      this.toModalList.push({ cId1: random, msg1: this.todoModalMessage });
      this.todoModalMessage = '';
    }
  }

  completeTodoList(e: {
    target: { parentElement: { classList: { remove: (arg0: string) => void; add: (arg0: string) => void } }; checked: boolean };
  }) {
    e.target.parentElement.classList.remove('done-task');
    if (e.target.checked) {
      e.target.parentElement.classList.add('done-task');
    }
  }

  completeTodoList1(e: {
    target: { parentElement: { classList: { remove: (arg0: string) => void; add: (arg0: string) => void } }; checked: boolean };
  }) {
    e.target.parentElement.classList.remove('done-task');
    if (e.target.checked) {
      e.target.parentElement.classList.add('done-task');
    }
  }
}
