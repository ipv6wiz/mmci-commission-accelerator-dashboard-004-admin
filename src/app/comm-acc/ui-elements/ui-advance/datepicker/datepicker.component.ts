// Angular import
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// project Import
import { DateComponent } from './common/date-component.component';
import { DEF_CONF } from './common/conts/consts';
import { IDatePickerConfig } from './date-picker/date-picker-config.model';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends DateComponent implements OnInit {
  // private Props
  override control!: FormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'DD-MM-YYYY'
  };

  config1: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'DD-MM-YYYY HH:mm:ss'
  };

  // Life cycle events
  ngOnInit(): void {
    this.control = this.buildForm();
  }
}
