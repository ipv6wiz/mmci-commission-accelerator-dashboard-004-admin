// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-widget-statistic',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './widget-statistic.component.html',
  styleUrls: ['./widget-statistic.component.scss']
})
export default class WidgetStatisticComponent {
  // public method
  tasks = [
    {
      bg: 'bg-c-blue',
      icon: 'fa fa-envelope',
      text: 'Unread Mails'
    },
    {
      bg: 'bg-c-green',
      icon: 'fa fa-camera',
      text: 'Image Upload'
    },
    {
      bg: 'bg-c-yellow',
      icon: 'fa fa-comments',
      text: 'Total Messages'
    },
    {
      bg: 'bg-c-red',
      icon: 'fa fa-shopping-cart',
      text: 'Orders Post'
    }
  ];

  order_card = [
    {
      bg: 'bg-c-blue',
      message: 'Orders Received',
      icon: 'icon-shopping-cart',
      text: 'Completed Orders',
      amount: '351',
      number: '486'
    },
    {
      bg: 'bg-c-green',
      message: 'Total Sales',
      icon: 'icon-tag',
      text: 'This Month',
      number: '1641',
      amount: '213'
    },
    {
      bg: 'bg-c-yellow',
      message: 'Revenue',
      icon: 'icon-repeat',
      text: 'This Month',
      amount: '$5,032',
      number: '$42,562'
    },
    {
      bg: 'bg-c-red',
      message: 'Total Profit',
      icon: 'icon-award',
      text: 'This Month',
      amount: '$542',
      number: '$9,562'
    }
  ];

  transition_card = [
    {
      title: 'RN',
      text: 'Registered Nurse',
      position: 'Nurse',
      code: 'RN 334445566'
    },
    {
      title: 'MT',
      text: 'Massage',
      position: 'Therapist',
      code: 'MT 334445566'
    }
  ];

  user_card = [
    {
      img: 'assets/images/user/avatar-2.jpg',
      number: '3,6',
      color: 'text-c-red',
      text: 'From 6 GB'
    },
    {
      img: 'assets/images/user/avatar-1.jpg',
      number: '85%',
      color: 'text-c-green',
      text: 'From 6 GB'
    },
    {
      img: 'assets/images/user/avatar-3.jpg',
      number: '73%',
      color: 'text-c-blue',
      text: 'From 6 GB'
    },
    {
      img: 'assets/images/user/avatar-4.jpg',
      number: '6',
      color: 'text-c-yellow',
      text: 'From 6 GB'
    }
  ];

  social_card = [
    {
      icon: 'fa-twitter text-c-green',
      number: '+40',
      text: 'Followers',
      describe: 'Your main list is growing',
      status: 'Check them out',
      color: 'btn-success'
    },
    {
      icon1: 'fa-puzzle-piece text-c-red',
      text: 'Business Plan',
      describe: 'This is your current active plan',
      status: 'Upgrade to VIP',
      color: 'btn-danger'
    }
  ];

  articles = [
    {
      title: 'Articles',
      number: '56',
      type: 'primary',
      value: '56',
      text: 'Draft: 22',
      background: 'text-c-blue',
      bg: 'bg-c-blue'
    },
    {
      title: 'Categories',
      number: '14',
      type: 'success',
      value: '14',
      text: 'Used: 14',
      background: 'text-c-green',
      bg: 'bg-c-green'
    },
    {
      title: 'Tickets',
      number: '85',
      type: 'danger',
      value: '85',
      text: 'Closed Today: 85',
      background: 'text-c-red',
      bg: 'bg-c-red'
    },
    {
      title: 'Forums',
      number: '42',
      type: 'warning',
      value: '42',
      text: 'Unanswered: 42',
      background: 'text-c-yellow',
      bg: 'bg-c-yellow'
    }
  ];

  summaries = [
    {
      number: '46',
      icon: 'fa fa-caret-up text-c-green',
      percentage: '100%',
      describe: 'New Installation',
      color: 'text-c-blue'
    },
    {
      number: '897',
      icon: 'fa fa-caret-down text-c-red',
      percentage: '10%',
      describe: 'Total Users',
      color: 'text-c-green'
    },
    {
      number: '8456',
      icon: 'fa fa-caret-up text-c-green',
      percentage: '87%',
      describe: 'Total Views',
      color: 'text-c-red'
    }
  ];

  images = [
    {
      img: 'assets/images/gallery-grid/img-grd-gal-1.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-2.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-3.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-4.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-5.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-6.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-4.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-5.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-6.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-4.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-5.jpg'
    },
    {
      img: 'assets/images/gallery-grid/img-grd-gal-6.jpg'
    }
  ];

  goal = [
    {
      title: 'Impressions',
      color: 'text-c-blue',
      number: '1,563',
      date: 'May 23 - June 01 (2018)',
      icon: 'fas fa-eye badge-light-primary'
    },
    {
      title: 'Goal',
      color: 'text-c-green',
      number: '30,564',
      date: 'May 28 - June 01 (2018)',
      icon: 'fas fa-bullseye badge-light-success'
    },
    {
      title: 'Impact',
      color: 'text-c-yellow',
      number: '42.6%',
      date: 'May 30 - June 01 (2018)',
      icon: 'fas fa-hand-paper badge-light-warning'
    }
  ];

  product = [
    {
      bg: 'bg-c-red',
      title: 'Total Profit',
      amount: '$1,783',
      icon: 'fas fa-money-bill-alt',
      background: 'label-danger',
      percentage: '+11%'
    },
    {
      bg: 'bg-c-blue',
      title: 'Total Orders',
      amount: '$15,830',
      icon: 'fas fa-database',
      background: 'label-primary',
      percentage: '+12%'
    },
    {
      bg: 'bg-c-green',
      title: 'Average Price',
      amount: '$6,780',
      icon: 'fas fa-dollar-sign',
      background: 'label-success',
      percentage: '+52%'
    },
    {
      bg: 'bg-c-yellow',
      title: 'Product Sold',
      amount: '6,784',
      icon: 'fas fa-tags',
      background: 'label-warning',
      percentage: '+53%'
    }
  ];

  project_ticket = [
    {
      icon: 'far fa-calendar-check',
      title: 'Ticket Answered',
      color: 'text-c-red',
      amount: '327',
      day: '10 Days',
      background: 'badge-light-danger',
      percentage: '53%'
    },
    {
      icon: 'fas fa-paper-plane',
      title: 'Project Launched',
      color: 'text-c-green',
      amount: '3 Year',
      day: '623',
      background: 'badge-light-success',
      percentage: '76%'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Unique Innovation',
      color: 'text-c-yellow',
      amount: '1 Month',
      day: '248',
      background: 'badge-light-warning',
      percentage: '73%'
    }
  ];

  client_start = [
    {
      background: 'badge-light-danger',
      icon: 'fas fa-folder-open',
      title: 'Open Tickets',
      color: 'text-c-red',
      amount: '128',
      describe: 'Tickets',
      symbol: 'fas fa-caret-down'
    },
    {
      background: 'badge-light-primary',
      icon: 'fas fa-file-archive',
      title: 'Close Tickets',
      color: 'text-c-blue',
      amount: '134',
      describe: 'Tickets',
      symbol: 'fas fa-caret-up'
    },
    {
      background: 'badge-light-success',
      icon: 'fas fa-users',
      title: 'New Clients',
      color: 'text-c-green',
      amount: '307',
      describe: 'Clients',
      symbol: 'fas fa-caret-up'
    },
    {
      background: 'badge-light-warning',
      icon: 'fas fa-database',
      title: 'New Orders',
      color: 'text-c-yellow',
      amount: '231',
      describe: 'Orders',
      symbol: 'fas fa-caret-up'
    }
  ];

  analytic_card = [
    {
      background: 'bg-c-green',
      icon: 'fas fa-shopping-cart text-c-green',
      amount: '15,678',
      text: 'Total Sales',
      title: 'Total Income',
      income: '$2,451',
      growth: '10%',
      position: 'fas fa-caret-up'
    },
    {
      background: 'bg-c-blue',
      icon: 'fas fa-users text-c-blue',
      amount: '1,678',
      text: 'Total Users',
      title: 'Total Revenue',
      income: '$2,451',
      growth: '30%',
      position: 'fas fa-caret-up'
    },
    {
      background: 'bg-c-red',
      icon: 'fas fa-file-code text-c-red',
      amount: '15,678',
      text: 'Total Project',
      title: 'Active Projects',
      income: '$2,451',
      growth: '10%',
      position: 'fas fa-caret-down'
    }
  ];
}
