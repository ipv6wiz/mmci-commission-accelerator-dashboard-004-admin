// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, SharedModule, DataTablesModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export default class UsersListComponent {
  tables = [
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'Quinn Flynn',
      email: 'Qf@domain.com',
      position: 'Support Lead',
      office: 'Edinburgh',
      age: '61',
      date: '2011/04/25',
      status: 'Active',
      background: 'badge-light-success'
    },
    {
      src: 'assets/images/user/avatar-2.jpg',
      name: 'Garrett Winters',
      email: 'gw@domain.com',
      position: 'Accountant',
      office: 'Tokyo',
      age: '63',
      date: '2011/07/25',
      status: 'Disabled',
      background: 'badge-light-danger'
    },
    {
      src: 'assets/images/user/avatar-3.jpg',
      name: 'Ashton Cox',
      email: 'ac@domain.com',
      position: 'Junior Technical Author',
      office: 'San Francisco',
      age: '66',
      date: '2009/01/12',
      status: 'Disabled',
      background: 'badge-light-danger'
    },
    {
      src: 'assets/images/user/avatar-4.jpg',
      name: 'Cedric Kelly',
      email: 'ck@domain.com',
      position: 'Senior Javascript Developer',
      office: 'Edinburgh',
      age: '22',
      date: '2012/03/29',
      status: 'Active',
      background: 'badge-light-success'
    },
    {
      src: 'assets/images/user/avatar-1.jpg',
      name: 'Air Aston',
      email: 'as@domain.com',
      position: 'Accountant',
      office: 'Tokyo',
      age: '33',
      date: '2008/11/28',
      status: 'Active',
      background: 'badge-light-success'
    },
    {
      src: 'assets/images/user/avatar-5.jpg',
      name: 'Briefly Williamson',
      email: 'bw@domain.com',
      position: 'Integration Specialist',
      office: 'New York',
      age: '61',
      date: '2012/12/02',
      status: 'Disabled',
      background: 'badge-light-danger'
    }
  ];
}
