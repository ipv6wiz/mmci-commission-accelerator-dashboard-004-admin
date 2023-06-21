// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export default class TaskListComponent {
  // public props
  todoListMessage!: string;
  todo_list_message_error!: boolean;
  todoList: object[] = [];

  // constructor
  constructor() {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.todoList.push({ cId: random, msg: 'Lorem Ipsum Dolor Sit Amet' });
    this.todoList.push({ cId: random + 1, msg: 'Industry standard dummy text ever since the 1500s' });
    this.todoList.push({ cId: random + 2, msg: 'The point of using Lorem Ipsum is that it has a more-or-less' });
    this.todoList.push({ cId: random + 3, msg: 'Contrary to popular belief' });
    this.todoList.push({ cId: random + 4, msg: 'Lorem Ipsum Dolor Sit Amet' });
  }

  // public method
  addTodoList() {
    if (this.todoListMessage === '' || this.todoListMessage === undefined) {
      this.todo_list_message_error = true;
    } else {
      const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      this.todoList.push({ cId: random, msg: this.todoListMessage });
      this.todoListMessage = '';
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

  tables = [
    {
      id: '#12',
      list: 'Add Proper Cursor In Sortable Page',
      img: 'assets/images/user/avatar-1.jpg',
      img1: 'assets/images/user/avatar-2.jpg'
    },
    {
      id: '#56',
      list: 'Edit the draft for the icons',
      img: 'assets/images/user/avatar-1.jpg',
      img1: 'assets/images/user/avatar-2.jpg'
    },
    {
      id: '#78',
      list: 'Create UI design model',
      img: 'assets/images/user/avatar-1.jpg',
      img1: 'assets/images/user/avatar-2.jpg',
      img2: 'assets/images/user/avatar-3.jpg'
    },
    {
      id: '#35',
      list: 'Checkbox Design issue',
      img: 'assets/images/user/avatar-1.jpg'
    },
    {
      id: '#20',
      list: 'Create UI design model',
      img: 'assets/images/user/avatar-1.jpg',
      img1: 'assets/images/user/avatar-2.jpg'
    }
  ];
}
