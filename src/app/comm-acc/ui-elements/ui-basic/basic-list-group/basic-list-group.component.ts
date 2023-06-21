import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-basic-list-group',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-list-group.component.html',
  styleUrls: ['./basic-list-group.component.scss']
})
export default class BasicListGroupComponent {
  // private Method
  item = [
    {
      text: 'Cras justo odio'
    },
    {
      text: 'Dapibus ac facilisis in'
    },
    {
      text: 'Morbi leo risus'
    },
    {
      text: 'Porta ac consectetur ac'
    },
    {
      text: 'Vestibulum at eros'
    }
  ];
}
