// Angular Import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullEventCalendarRoutingModule } from './full-event-calendar-routing.module';
import { FullEventCalendarComponent } from './full-event-calendar.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [FullEventCalendarComponent],
  imports: [
    CommonModule,
    FullEventCalendarRoutingModule,
    SharedModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class FullEventCalendarModule {}
