// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SaleReportComponent } from './sale-report/sale-report.component';

@Component({
  selector: 'app-widget-data',
  standalone: true,
  imports: [CommonModule, SharedModule, SaleReportComponent],
  templateUrl: './widget-data.component.html',
  styleUrls: ['./widget-data.component.scss']
})
export default class WidgetDataComponent {
  // public method
  homes = [
    {
      src: 'assets/images/widget/p2.jpg',
      code: 'PNG002344',
      name: 'John Deo',
      date: '05-01-2017',
      status: 'Failed',
      id: '#7234486',
      background: 'label-danger'
    },
    {
      src: 'assets/images/widget/p3.jpg',
      code: 'PNG002653',
      name: 'Eugine Turner',
      date: '04-01-2017',
      status: 'Delivered',
      id: '#7234417',
      background: 'label-success'
    },
    {
      src: 'assets/images/widget/p4.jpg',
      code: 'PNG002156',
      name: 'Jacqueline Howell',
      date: '03-01-2017',
      status: 'Pending',
      id: '#7234454',
      background: 'label-warning'
    }
  ];

  security = [
    {
      src: 'assets/images/widget/p3.jpg',
      code: 'PNG002653',
      name: 'Eugine Turner',
      date: '04-01-2017',
      status: 'Delivered',
      id: '#7234417',
      background: 'label-success'
    },
    {
      src: 'assets/images/widget/p4.jpg',
      code: 'PNG002156',
      name: 'Jacqueline Howell',
      date: '03-01-2017',
      status: 'Pending',
      id: '#7234454',
      background: 'label-warning'
    }
  ];

  entertainment = [
    {
      src: 'assets/images/widget/p1.jpg',
      code: 'PNG002413',
      name: 'Jane Elliott',
      date: '06-01-2017',
      status: 'Shipping',
      id: '#7234421',
      background: 'label-primary'
    },
    {
      src: 'assets/images/widget/p4.jpg',
      code: 'PNG002156',
      name: 'Jacqueline Howell',
      date: '03-01-2017',
      status: 'Pending',
      id: '#7234454',
      background: 'label-warning'
    }
  ];

  data = [
    {
      src: 'assets/images/widget/p1.jpg',
      code: 'PNG002413',
      name: 'Jane Elliott',
      date: '06-01-2017',
      status: 'Shipping',
      id: '#7234421',
      background: 'label-primary'
    },
    {
      src: 'assets/images/widget/p2.jpg',
      code: 'PNG002344',
      name: 'John Deo',
      date: '05-01-2017',
      status: 'Failed',
      id: '#7234486',
      background: 'label-danger'
    }
  ];

  images = [
    {
      src: 'assets/images/gallery-grid/img-grd-gal-1.jpg'
    },
    {
      src: 'assets/images/gallery-grid/img-grd-gal-2.jpg'
    },
    {
      src: 'assets/images/gallery-grid/img-grd-gal-3.jpg'
    },
    {
      src: 'assets/images/gallery-grid/img-grd-gal-2.jpg'
    }
  ];

  tables = [
    {
      src: 'assets/images/widget/p1.jpg',
      code: 'PNG002413',
      name: 'Jane Elliott',
      date: '06-01-2017',
      background: 'label-primary',
      status: 'Shipping',
      id: '#7234421'
    },
    {
      src: 'assets/images/widget/p2.jpg',
      code: 'PNG002344',
      name: 'John Deo',
      date: '05-01-2017',
      background: 'label-danger',
      status: 'Failed',
      id: '#7234486'
    },
    {
      src: 'assets/images/widget/p3.jpg',
      code: 'PNG002653',
      name: 'Eugine Turner',
      date: '04-01-2017',
      background: 'label-success',
      status: 'Delivered',
      id: '#7234417'
    },
    {
      src: 'assets/images/widget/p4.jpg',
      code: 'PNG002156',
      name: 'Jacqueline Howell',
      date: '03-01-2017',
      background: 'label-warning',
      status: 'Pending',
      id: '#7234454'
    }
  ];

  designs = [
    {
      icon: 'icon-arrow-up text-c-green',
      amount: '$6,456',
      icon2: 'icon-arrow-down text-c-red',
      amount2: '$2,500',
      status: 'primary',
      progress: '60',
      to: 'This Week',
      form: 'Previous Week',
      describe: 'App design and development',
      background: 'text-c-blue'
    },
    {
      icon: 'icon-arrow-down text-c-red',
      amount: '$2,450',
      icon2: 'icon-arrow-up text-c-green',
      amount2: '$5,420',
      status: 'danger',
      progress: '40',
      to: 'This Year',
      form: 'Previous Year',
      describe: 'Landing page design',
      background: 'text-c-red'
    },
    {
      icon: 'icon-arrow-down text-c-red',
      amount: '$8,360',
      icon2: 'icon-arrow-up text-c-green',
      amount2: '$9,400',
      status: 'success',
      progress: '40',
      to: 'This Month',
      form: 'Previous Month',
      describe: 'Mockup design',
      background: 'text-c-green'
    }
  ];

  titles = [
    {
      name: 'Earning Product',
      amount: '20,569'
    },
    {
      name: 'Yesterday',
      amount: '580',
      currency: 'USD'
    },
    {
      name: 'This Week',
      amount: '5,789',
      currency: 'USD'
    }
  ];

  products = [
    {
      status: 'text-c-green',
      sale: '2136',
      name: 'HeadPhone',
      amount: '$ 926.23'
    },
    {
      status: 'text-c-red',
      sale: '2546',
      name: 'Iphone 6',
      amount: '$ 485.85'
    },
    {
      status: 'text-c-blue',
      sale: '2681',
      name: 'Jacket',
      amount: '$ 786.4'
    },
    {
      status: 'text-c-purple',
      sale: '2756',
      name: 'HeadPhone',
      amount: '$ 563.45'
    },
    {
      status: 'text-c-red',
      sale: '8765',
      name: 'Sofa',
      amount: '$ 769.45'
    },
    {
      status: 'text-c-yellow',
      sale: '3652',
      name: 'Iphone 7',
      amount: '$ 754.45'
    },
    {
      status: 'text-c-green',
      sale: '7456',
      name: 'Jacket',
      amount: '$ 743.23'
    }
  ];

  requests = [
    {
      status: 'text-c-blue',
      title: 'Incoming requests'
    },
    {
      status: 'text-c-green',
      title: 'You have 2 pending requests..'
    },
    {
      status: 'text-c-red',
      title: 'You have 3 pending tasks'
    },
    {
      status: 'text-c-yellow',
      title: 'New order received'
    },
    {
      status: 'text-c-purple',
      title: 'Incoming requests'
    },
    {
      status: 'text-c-green',
      title: 'The 3 Golden Rules Professional Design..'
    },
    {
      status: 'text-c-red',
      title: 'You have 4 pending tasks'
    },
    {
      status: 'text-c-yellow',
      title: 'New order received'
    }
  ];

  revenues = [
    {
      icon: 'fas fa-caret-up',
      status: 'text-c-green',
      name: 'Bitcoin',
      amount: '+ $145.85'
    },
    {
      icon: 'fas fa-caret-down',
      status: 'text-c-red',
      name: 'Ethereum',
      amount: '- $6.368'
    },
    {
      icon: 'fas fa-caret-up',
      status: 'text-c-green',
      name: 'Ripple',
      amount: '+ $458.63'
    },
    {
      icon: 'fas fa-caret-down',
      status: 'text-c-red',
      name: 'Neo',
      amount: '- $5.631'
    },
    {
      icon: 'fas fa-caret-down',
      status: 'text-c-red',
      name: 'Bitcoin',
      amount: '- $75.85'
    },
    {
      icon: 'fas fa-caret-up',
      status: 'text-c-green',
      name: 'Ethereum',
      amount: '+ $453.63'
    },
    {
      icon: 'fas fa-caret-down',
      status: 'text-c-red',
      name: 'Ripple',
      amount: '- $786.63'
    },
    {
      icon: 'fas fa-caret-up',
      status: 'text-c-green',
      name: 'Neo',
      amount: '+ $145.85'
    },
    {
      icon: 'fas fa-caret-down',
      status: 'text-c-red',
      name: 'Bitcoin',
      amount: '- $6.368'
    },
    {
      icon: 'fas fa-caret-up',
      status: 'text-c-green',
      name: 'Ethereum',
      amount: '+ $458.63'
    },
    {
      icon: 'fas fa-caret-down',
      status: 'text-c-red',
      name: 'Neo',
      amount: '- $5.631'
    },
    {
      icon: 'fas fa-caret-down',
      status: 'text-c-red',
      name: 'Ripple',
      amount: '- $75.86'
    },
    {
      icon: 'fas fa-caret-up',
      status: 'text-c-green',
      name: 'Bitcoin',
      amount: '+ $453.63'
    },
    {
      icon: 'fas fa-caret-down',
      status: 'text-c-red',
      name: 'Ethereum',
      amount: '- $786.63'
    }
  ];

  customers = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'Alex Thompson',
      text: 'Cheers!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'John Doue',
      text: 'stay hungry stay foolish!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      name: 'Alex Thompson',
      text: 'Cheers!',
      status: 'deactive',
      icon: 'icon',
      time: '30 min ago'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      name: 'John Doue',
      text: 'Cheers!',
      status: 'deactive',
      icon: 'icon',
      time: '10 min ago'
    },
    {
      src: 'assets/images/user/avatar-5.jpg',
      name: 'Shirley Hoe',
      text: 'stay hungry stay foolish!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'John Doue',
      text: 'Cheers!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'James Alexander',
      text: 'stay hungry stay foolish!',
      status: 'active'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      name: 'John Doue',
      text: 'Cheers!',
      status: 'deactive',
      icon: 'icon',
      time: '10 min ago'
    }
  ];

  new_product = [
    {
      product: 'HeadPhone',
      src: 'assets/images/widget/p1.jpg',
      background: 'badge-light-warning',
      status: 'Pending',
      price: '$10'
    },
    {
      product: 'Iphone 6',
      src: 'assets/images/widget/p2.jpg',
      background: 'badge-light-danger',
      status: 'Cancel',
      price: '$20'
    },
    {
      product: 'Jacket',
      src: 'assets/images/widget/p3.jpg',
      background: 'badge-light-success',
      status: 'success',
      price: '$35'
    },
    {
      product: 'Sofa',
      src: 'assets/images/widget/p4.jpg',
      background: 'badge-light-danger',
      status: 'Cancel',
      price: '$85'
    },
    {
      product: 'Iphone 6',
      src: 'assets/images/widget/p2.jpg',
      background: 'badge-light-success',
      status: 'Success',
      price: '$20'
    },
    {
      product: 'HeadPhone',
      src: 'assets/images/widget/p1.jpg',
      background: 'badge-light-warning',
      status: 'Pending',
      price: '$50'
    },
    {
      product: 'Iphone 6',
      src: 'assets/images/widget/p2.jpg',
      background: 'badge-light-danger',
      status: 'Cancel',
      price: '$30'
    }
  ];

  contacts = [
    {
      company: 'Apple Company',
      start_date: '23/05/2017',
      end_date: '04/08/2018',
      background: 'badge-light-success',
      status: 'Paid'
    },
    {
      company: 'CodedThemes',
      start_date: '20/07/2017',
      end_date: '04/08/2019',
      background: 'badge-light-danger',
      status: 'Unpaid'
    },
    {
      company: 'Dribble Company',
      start_date: '13/05/2017',
      end_date: '03/01/2018',
      background: 'badge-light-success',
      status: 'Paid'
    },
    {
      company: 'Adobe Family',
      start_date: '11/01/2016',
      end_date: '02/03/2017',
      background: 'badge-light-success',
      status: 'Paid'
    },
    {
      company: 'Apple Company',
      start_date: '23/05/2017',
      end_date: '04/08/2018',
      background: 'badge-light-danger',
      status: 'Unpaid'
    },
    {
      company: 'Apple Company',
      start_date: '25/05/2018',
      end_date: '04/12/2018',
      background: 'badge-light-success',
      status: 'Paid'
    },
    {
      company: 'CodedThemes',
      start_date: '15/03/2018',
      end_date: '04/08/2016',
      background: 'badge-light-danger',
      status: 'Unpaid'
    }
  ];

  top_contacts = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'Shirley Hoe',
      position: 'Sales executive,NY',
      amount: '$78.001',
      icon: 'fas fa-level-down-alt text-c-red'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'James Alexander',
      position: 'Sales executive,EL',
      amount: '$89.051',
      icon: 'fas fa-level-up-alt text-c-green'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      name: 'Shirley Hoe',
      position: 'Sales executive,NY',
      amount: '$89.051',
      icon: 'fas fa-level-up-alt text-c-green'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      name: 'James Alexander',
      position: 'Sales executive,EL',
      amount: '$78.001',
      icon: 'fas fa-level-down-alt text-c-red'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'Shirley Hoe',
      position: 'Sales executive,NY',
      amount: '$78.001',
      icon: 'fas fa-level-down-alt text-c-red'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'James Alexander',
      position: 'Sales executive,EL',
      amount: '$58.769',
      icon: 'fas fa-level-up-alt text-c-green'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      name: 'Shirley Hoe',
      position: 'Sales executive,NY',
      amount: '$96.635',
      icon: 'fas fa-level-up-alt text-c-green'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      name: 'James Alexander',
      position: 'Sales executive,EL',
      amount: '$78.001',
      icon: 'fas fa-level-down-alt text-c-red'
    }
  ];

  what_new = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      img: 'img-radius align-top update-icon',
      title: 'Your Manager Posted.',
      name: 'Jonny michel'
    },
    {
      icon: 'feather icon-briefcase bg-c-red update-icon',
      title: 'You have 3 pending Task.',
      name: 'Hemilton'
    },
    {
      icon: 'feather icon-check f-w-600 bg-c-green update-icon',
      title: 'New Order Received.',
      name: 'Hemilton'
    },
    {
      icon: 'feather icon-briefcase bg-c-red update-icon',
      title: 'You have 3 pending Task.',
      name: 'Hemilton'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      img: 'img-radius align-top update-icon',
      title: 'Your Manager Posted.',
      name: 'Jonny michel'
    },
    {
      icon: 'feather icon-check f-w-600 bg-c-green update-icon',
      title: 'New Order Received.',
      name: 'Hemilton'
    },
    {
      icon: 'feather icon-briefcase bg-c-red update-icon',
      title: 'You have 2 pending Task.',
      name: 'James Alexander'
    }
  ];

  activity = [
    {
      name: 'Development & Update',
      text: 'Lorem ipsum dolor sit amen,',
      background: 'text-c-blue',
      status: 'More'
    },
    {
      name: 'Showcases',
      text: 'Lorem ipsum dolor sit amen,',
      background: 'text-c-blue',
      status: 'More'
    },
    {
      name: 'Miscellaneous',
      text: 'Lorem ipsum dolor sit amen,',
      background: 'text-c-green',
      status: 'More'
    },
    {
      name: 'Showcases',
      text: 'Lorem ipsum dolor sit amen,',
      background: 'text-c-blue',
      status: 'More'
    },
    {
      name: 'Miscellaneous',
      text: 'Lorem ipsum dolor sit amen,',
      background: 'text-c-green',
      status: 'More'
    },
    {
      name: 'Development',
      text: 'Lorem ipsum dolor sit amen,',
      background: 'text-c-green',
      status: 'More'
    },
    {
      name: 'Showcases',
      text: 'Lorem ipsum dolor sit amen,',
      background: 'text-c-blue',
      status: 'More'
    }
  ];

  statistics = [
    {
      amount: '100',
      title: 'Engagement',
      percentage: '43%',
      background: 'badge-light-warning'
    },
    {
      amount: '480',
      title: 'Likes',
      percentage: '48%',
      background: 'badge-light-success'
    },
    {
      amount: '230',
      title: 'Clicks',
      percentage: '30%',
      background: 'badge-light-danger'
    },
    {
      amount: '480',
      title: 'Likes',
      percentage: '30%',
      background: 'badge-light-danger'
    },
    {
      amount: '500',
      title: 'Clicks',
      percentage: '40%',
      background: 'badge-light-primary'
    },
    {
      amount: '400',
      title: 'Engagement',
      percentage: '60%',
      background: 'badge-light-warning'
    },
    {
      amount: '600',
      title: 'Clicks',
      percentage: '50%',
      background: 'badge-light-success'
    },
    {
      amount: '900',
      title: 'Likes',
      percentage: '90%',
      background: 'badge-light-primary'
    }
  ];

  over_view = [
    {
      src: 'assets/images/user/avatar-4.jpg',
      name: 'Shirley Hoe',
      text: 'Sales executive , NY',
      company: 'Pinterest',
      score: '223',
      date: '19-11-2018',
      tag: 'Sketch',
      tag1: 'Ui'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'James Alexander',
      text: 'Sales executive , EL',
      company: 'Facebook',
      score: '268',
      date: '10-10-2017',
      tag: 'Ux',
      tag1: 'Ui',
      tag3: 'php'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'Shirley Hoe',
      text: 'Sales executive , NY',
      company: 'Google',
      score: '293',
      date: '16-03-2018',
      tag: 'Ui',
      tag1: 'Sketch'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      name: 'Alex Thompson',
      text: 'Sales executive , NY',
      company: 'Pinterest',
      score: '568',
      date: '19-11-2018',
      tag2: 'php',
      tag4: 'Ui',
      tag3: 'Ux'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'James Alexander',
      text: 'Sales executive , EL',
      company: 'Facebook',
      score: '796',
      date: '20-10-2017',
      tag: 'Sketch',
      tag3: 'Ui'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'John Deo',
      text: 'Sales executive , EL',
      company: 'Twitter',
      score: '465',
      date: '25-11-2018',
      tag1: 'Ui',
      tag2: 'Ux',
      tag3: 'php'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      name: 'Shirley Hoe',
      text: 'Sales executive , NY',
      company: 'Google',
      score: '783',
      date: '16-03-2017',
      tag: 'Ui',
      tag1: 'Sketch'
    }
  ];

  testimonial = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'John Deo',
      background: 'success',
      value: '85',
      number: '3.2'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'Alex Thompson',
      background: 'primary',
      value: '50',
      number: '4.2'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'Shirley Hoe',
      background: 'danger',
      value: '60',
      number: '6.5'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'John Deo',
      background: 'warning',
      value: '85',
      number: '9.6'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'James Alexander',
      background: 'success',
      value: '30',
      number: '5.5'
    }
  ];

  product_new = [
    {
      name: 'Sofa',
      code: '#PHD001',
      email: 'abc@gmail.com',
      background: 'badge-light-danger',
      status: 'Out Stock',
      icon: 'text-c-yellow'
    },
    {
      name: 'Computer',
      code: '#PHD002',
      email: 'cdc@gmail.com',
      background: 'badge-light-success',
      status: 'In Stock',
      icon: 'text-muted'
    },
    {
      name: 'Mobile',
      code: '#PHD003',
      email: 'pqr@gmail.com',
      background: 'badge-light-danger',
      status: 'Out Stock',
      icon: 'text-c-yellow'
    },
    {
      name: 'Coat',
      code: '#PHD004',
      email: 'bcs@gmail.com',
      background: 'badge-light-success',
      status: 'In Stock',
      icon: 'text-muted'
    },
    {
      name: 'Watch',
      code: '#PHD006',
      email: 'hfg@gmail.com',
      background: 'badge-light-danger',
      status: 'Out Stock',
      icon: 'text-c-yellow'
    },
    {
      name: 'Sofa',
      code: '#PHD007',
      email: 'xyz@gmail.com',
      background: 'badge-light-success',
      status: 'In Stock',
      icon: 'text-muted'
    },
    {
      name: 'Watch',
      code: '#PHD009',
      email: 'opr@gmail.com',
      background: 'badge-light-danger',
      status: 'Out Stock',
      icon: 'text-c-yellow'
    }
  ];

  task_list = [
    {
      subject: 'Building Marketing List',
      background: 'badge-light-danger',
      status: 'Open',
      name: 'John Mali',
      priority: 'Normal',
      start_date: '8/8/2017',
      end_date: '8/9/2018'
    },
    {
      subject: 'Project Task List',
      background: 'badge-light-primary',
      status: 'New',
      name: 'Ken Mali',
      priority: 'Low',
      start_date: '6/7/2017',
      end_date: '1/1/2018'
    },
    {
      subject: 'Building Marketing List',
      background: 'badge-light-danger',
      status: 'Open',
      name: 'John Mali',
      priority: 'High',
      start_date: '3/9/2017',
      end_date: '8/6/2018'
    },
    {
      subject: 'Project Task List',
      background: 'badge-light-success',
      status: 'Close',
      name: 'Ken Mali',
      priority: 'Normal',
      start_date: '9/4/2017',
      end_date: '3/6/2018'
    },
    {
      subject: 'Building Marketing List',
      background: 'badge-light-primary',
      status: 'New',
      name: 'John Mali',
      priority: 'High',
      start_date: '7/4/2017',
      end_date: '10/1/2018'
    },
    {
      subject: 'Building Marketing List',
      background: 'badge-light-danger',
      status: 'Open',
      name: 'Ken Mali',
      priority: 'High',
      start_date: '7/8/2017',
      end_date: '8/9/2018'
    },
    {
      subject: 'Project Task List',
      background: 'badge-light-primary',
      status: 'New',
      name: 'John Mali',
      priority: 'Normal',
      start_date: '6/6/2017',
      end_date: '9/9/2018'
    }
  ];

  my_project = [
    {
      title: 'New Dashboard',
      time: '5 Mins ago',
      src: 'assets/images/user/avatar-2.jpg',
      src1: 'assets/images/user/avatar-3.jpg',
      src2: 'assets/images/user/avatar-1.jpg'
    },
    {
      title: 'Web Design',
      time: '8 Mins ago',
      src: 'assets/images/user/avatar-2.jpg',
      src1: 'assets/images/user/avatar-3.jpg'
    },
    {
      title: 'Android Design',
      time: '12 Mins ago',
      src: 'assets/images/user/avatar-4.jpg',
      src1: 'assets/images/user/avatar-2.jpg',
      src2: 'assets/images/user/avatar-3.jpg'
    },
    {
      title: 'New Dashboard',
      time: '5 Mins ago',
      src: 'assets/images/user/avatar-2.jpg',
      src1: 'assets/images/user/avatar-3.jpg',
      src2: 'assets/images/user/avatar-2.jpg'
    },
    {
      title: 'photoShop Design',
      time: '2 Mins ago',
      src: 'assets/images/user/avatar-2.jpg',
      src1: 'assets/images/user/avatar-3.jpg'
    },
    {
      title: 'Ios Design',
      time: '1 Mins ago',
      src: 'assets/images/user/avatar-4.jpg',
      src1: 'assets/images/user/avatar-2.jpg',
      src2: 'assets/images/user/avatar-3.jpg'
    },
    {
      title: 'Web Design',
      time: '8 Mins ago',
      src: 'assets/images/user/avatar-2.jpg',
      src1: 'assets/images/user/avatar-3.jpg'
    }
  ];

  chats = [
    {
      message: 'Nice to meet you!'
    },
    {
      message: 'Nice to meet you!',
      img: 'assets/images/slider/img-slide-4.jpg',
      img1: 'assets/images/slider/img-slide-5.jpg'
    }
  ];

  feeds = [
    {
      icon: 'icon-bell badge-light-primary',
      text: 'You have 3 pending tasks.',
      time: 'Just Now'
    },
    {
      icon: 'icon-shopping-cart badge-light-danger',
      text: 'New order received',
      time: '30 min ago'
    },
    {
      icon: 'icon-file-text badge-light-success',
      text: 'You have 3 pending tasks.',
      time: 'Just Now'
    },
    {
      icon: 'icon-bell badge-light-primary',
      text: 'You have 3 pending tasks.',
      time: 'Just Now'
    },
    {
      icon: 'icon-bell badge-light-primary',
      text: 'You have 4 tasks Done.',
      time: '1 hours ago'
    },
    {
      icon: 'icon-file-text badge-light-success',
      text: 'You have 2 pending tasks.',
      time: 'Just Now'
    },
    {
      icon: 'icon-shopping-cart badge-light-danger',
      text: 'New order received',
      time: '4 hours ago'
    },
    {
      icon: 'icon-shopping-cart badge-light-danger',
      text: 'New order Done',
      time: 'Just Now'
    },
    {
      icon: 'icon-file-text badge-light-success',
      text: 'You have 5 pending tasks.',
      time: '5 hours ago'
    },
    {
      icon: 'icon-bell badge-light-primary',
      text: 'You have 4 pending tasks.',
      time: '2 hours ago'
    }
  ];

  activities = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      user: 'Ida Morgens',
      work: 'The quick brown',
      time: '3:28 PM',
      background: 'text-c-green',
      status: 'Done'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      user: 'Albert Andersen',
      work: 'Jumps over',
      time: '2:37 PM',
      background: 'text-c-red',
      status: 'Missed'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      user: 'Slice Larsen',
      work: '>Dog the quick',
      time: '10:23 AM',
      background: 'text-c-purple',
      status: 'Delayed'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      user: 'Ida Morgens',
      work: 'The quick brown',
      time: '4:28 PM',
      background: 'text-c-green',
      status: 'Done'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      user: 'John Deo',
      work: '>Dog the quick',
      time: '3:28 PM',
      background: 'text-c-yellow',
      status: 'pending'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      user: 'Alex Thompson',
      work: 'Jumps over',
      time: '4:00 PM',
      background: 'text-c-red',
      status: 'Missed'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      user: 'Albert Andersen',
      work: 'Dog the quick',
      time: '5:27 PM',
      background: 'text-c-green',
      status: 'Done'
    }
  ];

  application = [
    {
      src: 'assets/images/user/avatar-2.jpg',
      company: 'Facebook',
      sub_company: 'Apple',
      installs: '523.423',
      color: 'text-c-green',
      daily_install: '+ 84 Daily',
      date: 'Feb 11 2017',
      budget: '$ 16,244',
      background: 'badge-light-primary',
      status: 'Active'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      company: 'Twitter',
      sub_company: 'CS Form',
      installs: '7.239',
      color: 'text-c-yellow',
      daily_install: '+ 5 Daily',
      date: 'Jan 19 2017',
      budget: '$ 9,937',
      background: 'badge-light-warning',
      status: 'Not Active'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      company: 'Instagram',
      sub_company: 'Microsoft',
      installs: '5.877',
      color: 'text-c-green',
      daily_install: '+ 12 Daily',
      date: 'Aug 4 2017',
      budget: '$ 28,039',
      background: 'badge-light-success',
      status: 'Paused'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      company: 'Facebook',
      sub_company: 'Apple',
      installs: '523.423',
      color: 'text-c-green',
      daily_install: '+ 50 Daily',
      date: 'April 10 2017',
      budget: '$ 16,244',
      background: 'badge-light-primary',
      status: 'Active'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      company: 'Twitter',
      sub_company: 'CS Form',
      installs: '7.239',
      color: 'text-c-yellow',
      daily_install: '+ 5 Daily',
      date: 'May 20 2018',
      budget: '$ 3,937',
      background: 'badge-light-warning',
      status: 'Not Active'
    }
  ];

  list_project = [
    {
      img: 'assets/images/user/avatar-1.jpg',
      title: 'Social Media App',
      background: 'text-c-green',
      name: 'Tristan Madden',
      complete: '326,134',
      status: '68%',
      date: 'October 26, 2017'
    },
    {
      img: 'assets/images/user/avatar-2.jpg',
      title: 'Newspaper Wordpress Web',
      background: 'text-c-red',
      name: 'Marcus Poulenc',
      complete: '110,134',
      status: '46%',
      date: 'September 4, 2017'
    },
    {
      img: 'assets/images/user/avatar-3.jpg',
      title: 'Dashboard UI Kit Design',
      background: 'text-c-blue',
      name: 'Felix Johann',
      complete: '226,134',
      status: '31%',
      date: 'November 14, 2017'
    },
    {
      img: 'assets/images/user/avatar-1.jpg',
      title: 'Social Media App',
      background: 'text-c-green',
      name: "Ida Jorge's",
      complete: '500,134',
      status: '85%',
      date: 'December 14, 2017'
    },
    {
      img: 'assets/images/user/avatar-3.jpg',
      title: 'Newspaper Wordpress Web',
      background: 'text-c-red',
      name: 'Tristan Madden',
      complete: '326,134',
      status: '68%',
      date: 'January 26, 2017'
    },
    {
      img: 'assets/images/user/avatar-4.jpg',
      title: 'Social Media App',
      background: 'text-c-blue',
      name: 'Marcus Poulenc',
      complete: '110,134',
      status: '46%',
      date: 'April 4, 2017'
    }
  ];

  lists = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      background: 'text-c-green',
      title: 'The Quick Brown Fox Jumps'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      background: 'text-c-yellow',
      title: 'Over The Lazy Dog'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      background: 'text-c-purple',
      title: 'The Quick Brown Fox'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      background: 'text-c-blue',
      title: 'The Quick Brown Fox Jumps'
    },
    {
      src: 'assets/images/user/avatar-5.jpg',
      background: 'text-c-yellow',
      title: 'Over The Lazy Dog'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      background: 'text-c-purple',
      title: 'The Quick Brown Fox'
    }
  ];

  lists2 = [
    {
      src: 'assets/images/user/avatar-5.jpg',
      background: 'text-c-blue',
      title: 'The Quick Brown Fox Jumps'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      background: 'text-c-purple',
      title: 'Over The Lazy Dog'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      background: 'text-c-yellow',
      title: 'The Quick Brown Fox'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      background: 'text-c-green',
      title: 'The Quick Brown Fox Jumps'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      background: 'text-c-yellow',
      title: 'Over The Lazy Dog'
    },
    {
      src: 'assets/images/user/avatar-5.jpg',
      background: 'text-c-purple',
      title: 'The Quick Brown Fox'
    }
  ];

  full_table = [
    {
      id: '#467',
      code: '8765482',
      date: 'November 14, 2017',
      budget: '$ 874.23',
      background: 'badge-light-primary',
      status: 'Active',
      icon: 'text-c-yellow'
    },
    {
      id: '#466',
      code: '2366482',
      date: 'January 18, 2018',
      budget: '$ 235.23',
      background: 'badge-light-warning',
      status: 'Not Active',
      icon: 'text-black-50'
    },
    {
      id: '#465',
      code: '8832638',
      date: 'October 14, 2017',
      budget: '$ 233.23',
      background: 'badge-light-success',
      status: 'Active',
      icon: 'text-c-yellow'
    },
    {
      id: '#464',
      code: '3332538',
      date: 'July 14, 2018',
      budget: '$ 244.23',
      background: 'badge-light-warning',
      status: 'Active',
      icon: 'text-black-50'
    },
    {
      id: '#463',
      code: '8832638',
      date: 'October 14, 2017',
      budget: '$ 233.23',
      background: 'badge-light-success',
      status: 'Active',
      icon: 'text-c-yellow'
    },
    {
      id: '#467',
      code: '8765482',
      date: 'November 14, 2018',
      budget: '$ 874.23',
      background: 'badge-light-primary',
      status: 'Active',
      icon: 'text-black-50'
    },
    {
      id: '#789',
      code: '2378945',
      date: 'April 16, 2017',
      budget: '$ 235.23',
      background: 'badge-light-warning',
      status: 'Not Active',
      icon: 'text-c-yellow'
    },
    {
      id: '#922',
      code: '3789645',
      date: 'July 7, 2018',
      budget: '$ 244.23',
      background: 'badge-light-success',
      status: 'Active',
      icon: 'text-black-50'
    }
  ];

  recent_user = [
    {
      img: 'assets/images/user/avatar-1.jpg',
      name: 'Isabella Christensen',
      date: '11 Sep 12:56',
      color: 'text-c-green',
      bg: 'badge-light-primary',
      background: 'badge-light-success'
    },
    {
      img: 'assets/images/user/avatar-2.jpg',
      name: 'Mathilda Andersen',
      date: '11 May 10:35',
      color: 'text-c-red',
      bg: 'badge-light-danger',
      background: 'badge-light-warning'
    },
    {
      img: 'assets/images/user/avatar-3.jpg',
      name: 'Karla Soreness',
      date: '9 Feb 17:38',
      color: 'text-c-green',
      bg: 'badge-light-primary',
      background: 'badge-light-success'
    },
    {
      img: 'assets/images/user/avatar-4.jpg',
      name: "Ida Jorge's",
      date: '19 May 12:35',
      color: 'text-c-red',
      bg: 'badge-light-danger',
      background: 'badge-light-warning'
    },
    {
      img: 'assets/images/user/avatar-2.jpg',
      name: 'Mathilda Andersen',
      date: '11 May 10:35',
      color: 'text-c-red',
      bg: 'badge-light-danger',
      background: 'badge-light-warning'
    },
    {
      img: 'assets/images/user/avatar-3.jpg',
      name: 'Karla Soreness',
      date: '9 Feb 17:38',
      color: 'text-c-green',
      bg: 'badge-light-primary',
      background: 'badge-light-success'
    },
    {
      img: 'assets/images/user/avatar-4.jpg',
      name: "Ida Jorge's",
      date: '19 May 12:35',
      color: 'text-c-red',
      bg: 'badge-light-danger',
      background: 'badge-light-warning'
    }
  ];
}
