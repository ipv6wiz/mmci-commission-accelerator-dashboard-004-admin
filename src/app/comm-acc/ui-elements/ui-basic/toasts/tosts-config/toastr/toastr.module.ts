import { ModuleWithProviders, NgModule } from '@angular/core';

import { ToastComponent } from './toast.component';
import { DefaultNoComponentGlobalConfig, GlobalConfig, TOAST_CONFIG } from './toastr-config';
import { provideToastr } from './toast.provider';

@NgModule({
  imports: [ToastComponent],
  exports: [ToastComponent]
})
export class ToastrModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<ToastrModule> {
    return {
      ngModule: ToastrModule,
      providers: [provideToastr(config)]
    };
  }
}

@NgModule({})
export class ToastrComponentlessModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<ToastrModule> {
    return {
      ngModule: ToastrModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultNoComponentGlobalConfig,
            config
          }
        }
      ]
    };
  }
}
