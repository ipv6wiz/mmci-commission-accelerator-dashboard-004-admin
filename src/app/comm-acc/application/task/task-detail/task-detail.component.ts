// Angular Import
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export default class TaskDetailComponent implements OnDestroy, OnInit {
  // public props
  future!: Date;
  futureString = 'July 29, 2023 12:00:00';
  diff!: number;
  $counter!: Observable<number>;
  subscription!: Subscription;
  message!: string;
  dYears!: number;
  dDays!: number;
  dHours!: number;
  dMinutes!: number;
  dSeconds!: number;

  // life cycle event
  ngOnInit() {
    this.future = new Date(this.futureString);
    this.$counter = interval(1000).pipe(
      map((x) => {
        this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
        return x;
      })
    );

    this.subscription = this.$counter.subscribe(() => (this.message = this.dhms(this.diff)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // public method
  dhms(t: number) {
    let years = 0;
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    days = Math.floor(t / 86400);
    if (days > 365) {
      years = Math.floor(days / 365);
      days = days - years * 365;
    }
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    this.dYears = years;
    this.dDays = days;
    this.dHours = hours;
    this.dMinutes = minutes;
    this.dSeconds = seconds;

    return [years + ' years', days + ' days', hours + ' hours', minutes + ' min', seconds + ' sec'].join(' ');
  }

  task_details = [
    {
      icon: 'fas fa-adjust',
      title: 'Project',
      text: 'Singular app'
    },
    {
      icon: 'far fa-calendar-alt',
      title: 'Updated',
      text: '12 May, 2015'
    },
    {
      icon: 'far fa-credit-card',
      title: 'Created',
      text: '25 Feb, 2015'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Priority',
      text: 'Highest',
      symbol: 'fas fa-upload'
    },
    {
      icon: 'fas fa-sync-alt',
      title: 'Revisions',
      text: '29'
    },
    {
      icon: 'fas fa-user-plus',
      title: 'Added by',
      text: 'Winnie'
    },
    {
      icon: 'fas fa-thermometer-half',
      title: 'Status',
      text: 'Published'
    }
  ];

  setting = [
    {
      title: 'Publish after save'
    },
    {
      title: 'Allow comments'
    },
    {
      title: 'Allow users to edit the task'
    }
  ];

  settings = [
    {
      title: 'Use task timer'
    },
    {
      title: 'Auto saving'
    },
    {
      title: 'Auto saving'
    },
    {
      title: 'Allow attachments'
    }
  ];

  medias = [
    {
      icon: 'fas fa-user-secret',
      background: 'btn-outline-primary',
      title: 'Drop the IE specific hacks for temporal inputs',
      time: '4 minutes ago'
    },
    {
      icon: 'fas fa-anchor',
      background: 'btn-outline-danger',
      title: 'Add full font overrides for popovers and tooltips',
      time: '36 minutes ago'
    },
    {
      icon: 'fas fa-desktop',
      background: 'btn-outline-primary',
      title: 'created a new Design branch',
      time: '2 month ago'
    },
    {
      icon: 'fas fa-briefcase',
      background: 'btn-outline-success',
      title: 'merged Master and Dev branches',
      time: '6 month ago'
    }
  ];

  attached = [
    {
      icon: 'far fa-file-word',
      title: 'Overdrew_scowled.doc',
      text: 'Size: 1.2Mb',
      file: 'Winnie'
    },
    {
      icon: 'far fa-file-powerpoint',
      title: 'And_less_maternally.pdf',
      text: 'Size: 0.11Mb ',
      file: 'Eugene'
    },
    {
      icon: 'far fa-file-pdf',
      title: 'The_less_overslept.pdf',
      text: 'Size:5.9Mb',
      file: 'Natalie'
    },
    {
      icon: 'far fa-file-excel',
      title: 'Well_equitably.mov',
      text: 'Size:20.9Mb',
      file: 'Jenny'
    }
  ];

  users = [
    {
      img: 'assets/images/user/avatar-1.jpg',
      name: 'Sorting media',
      position: 'Software Engineer'
    },
    {
      img: 'assets/images/user/avatar-2.jpg',
      name: 'Larry heading',
      position: 'Web Designer'
    },
    {
      img: 'assets/images/user/avatar-3.jpg',
      name: 'Mark',
      position: 'Chief Financial Officer (CFO)'
    },
    {
      img: 'assets/images/user/avatar-1.jpg',
      name: 'John Doe',
      position: 'Senior Marketing Designer'
    }
  ];

  tables = [
    {
      id: '1',
      task: 'Design mockup',
      date: '22 December, 16'
    },
    {
      id: '2',
      task: 'Software Engineer',
      date: '01 December, 16'
    },
    {
      id: '3',
      task: 'PhotoShop And Illustrator',
      date: '15 December, 16'
    },
    {
      id: '4',
      task: 'Allocated Resource',
      date: '28 December, 16'
    },
    {
      id: '5',
      task: 'Financial Control',
      date: '20 December, 16'
    }
  ];
}
