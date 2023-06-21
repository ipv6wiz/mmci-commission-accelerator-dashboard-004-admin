// Angular Import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// project Import
import { AdvNotificationRoutingModule } from './adv-notification-routing.module';
import { AdvNotificationComponent } from './adv-notification.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [AdvNotificationComponent],
  imports: [CommonModule, AdvNotificationRoutingModule, NotifierModule.withConfig(customNotifierOptions), SharedModule]
})
export class AdvNotificationModule {}
