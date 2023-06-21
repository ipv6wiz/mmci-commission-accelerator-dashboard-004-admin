// Angular Import
import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

// project import
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormRadioComponent } from './form-radio/form-radio.component';
import { FormSwitchComponent } from './form-switch/form-switch.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-form-advance',
  standalone: true,
  imports: [CommonModule, FormCheckboxComponent, FormRadioComponent, FormSwitchComponent, SharedModule, TagInputModule],
  templateUrl: './form-advance.component.html',
  styleUrls: ['./form-advance.component.scss']
})
export default class FormAdvanceComponent {
  //  public method
  items = ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo'];
  itemsEdit = ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo'];

  itemsAsObjects = [
    { id: 0, name: 'Amsterdam', readonly: true },
    { id: 1, name: 'Washington' },
    { id: 2, name: 'Sydney', readonly: true },
    { id: 3, name: 'Beijing', readonly: true },
    { id: 4, name: 'Cairo' }
  ];

  errorMessages = {
    'startsWithAt@': "Your items need to start with '@'",
    endsWith$: "Your items need to end with '$'"
  };

  validators = [this.startsWithAt, this.endsWith$];

  // private Method
  private startsWithAt(control: UntypedFormControl) {
    if (control.value.charAt(0) !== '@') {
      return {
        'startsWithAt@': true
      };
    }

    return null;
  }

  private endsWith$(control: UntypedFormControl) {
    if (control.value.charAt(control.value.length - 1) !== '$') {
      return {
        endsWith$: true
      };
    }

    return null;
  }
}
