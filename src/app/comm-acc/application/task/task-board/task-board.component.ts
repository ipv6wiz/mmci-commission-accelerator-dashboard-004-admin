// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export default class TaskBoardComponent {
  // public props
  isCompleteStatus = false;
  isAssignUsers = false;
  isRevision = false;

  // public method
  tasks = [
    {
      title: 'Highest priority',
      color: 'success',
      progress: '80'
    },
    {
      title: 'High priority',
      color: 'info',
      progress: '70'
    },
    {
      title: 'Normal priority',
      color: 'warning',
      progress: '50'
    },
    {
      title: 'Low priority',
      color: 'danger',
      progress: '60'
    }
  ];

  medias = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      status: 'bg-danger',
      name: 'Josephine Doe',
      position: 'Santa Ana,CA'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      status: 'bg-success',
      name: 'Josephine Doe',
      position: 'Huntington, NJ'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      status: 'bg-danger',
      name: 'Josephine Doe',
      position: 'Wilmington,WA'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      status: 'bg-success',
      name: 'Josephine Doe',
      position: 'Billions ,IL'
    }
  ];

  revision = [
    {
      icon: 'fas fa-cogs',
      background: 'btn-outline-primary',
      title: 'Drop the IE specific hacks for temporal inputs',
      time: '4 minutes ago'
    },
    {
      icon: 'fas fa-share-alt',
      background: 'btn-outline-danger',
      title: 'Have Carousel ignore keyboard events',
      time: '12 Dec,2015'
    },
    {
      icon: 'fas fa-font',
      background: 'btn-outline-warning',
      title: 'Add full font overrides for popovers and tooltips',
      time: '2 month ago'
    },
    {
      icon: 'fas fa-mobile-alt',
      background: 'btn-outline-success',
      title: 'Responsive Assignment',
      time: '6 month ago'
    }
  ];

  cards = [
    {
      background: 'card-border-c-blue',
      color: 'btn-primary'
    },
    {
      background: 'card-border-c-green',
      color: 'btn-success'
    },
    {
      background: 'card-border-c-red',
      color: 'btn-danger'
    },
    {
      background: 'card-border-c-yellow',
      color: 'btn-warning'
    },
    {
      background: 'card-border-c-green',
      color: 'btn-success'
    },
    {
      background: 'card-border-c-blue',
      color: 'btn-primary'
    }
  ];
}
