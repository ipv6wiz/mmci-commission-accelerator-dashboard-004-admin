// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-us-profile',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './us-profile.component.html',
  styleUrls: ['./us-profile.component.scss']
})
export class UsProfileComponent {
  // public props
  editProfile: boolean;
  editProfileIcon: string;
  editContact: boolean;
  editContactIcon: string;
  editOtherInfo: boolean;
  editOtherInfoIcon: string;

  // constructor
  constructor() {
    this.editProfile = false;
    this.editProfileIcon = 'icon-edit';

    this.editContact = false;
    this.editContactIcon = 'icon-edit';

    this.editOtherInfo = false;
    this.editOtherInfoIcon = 'icon-edit';
  }

  // public method
  details = [
    {
      title: 'Full Name',
      name: ' Lara Doe'
    },
    {
      title: 'Gender',
      name: ' Male'
    },
    {
      title: 'Birth Date',
      name: ' 16-12-1994'
    },
    {
      title: 'Martial Status',
      name: ' Unmarried'
    }
  ];

  information = [
    {
      title: 'Mobile Number',
      name: '+1 9999-999-999'
    },
    {
      title: 'Email Address',
      name: 'Demo@domain.com'
    },
    {
      title: 'Twitter',
      name: '@phoenixCoded'
    },
    {
      title: 'Skype',
      name: '@phoenixCoded demo'
    }
  ];

  contact_information = [
    {
      title: 'Mobile Number',
      name: '+1 9999-999-999'
    },
    {
      title: 'Email Address',
      name: 'Demo@domain.com'
    },
    {
      title: 'Twitter',
      name: '@phoenixCoded'
    },
    {
      title: 'Skype',
      name: '@phoenixCoded demo'
    }
  ];

  other_information = [
    {
      title: 'Occupation',
      name: 'Designer'
    },
    {
      title: 'Skills',
      name: 'C#, Javascript, Scss'
    },
    {
      title: 'Jobs',
      name: 'CodedThemes'
    }
  ];
}
