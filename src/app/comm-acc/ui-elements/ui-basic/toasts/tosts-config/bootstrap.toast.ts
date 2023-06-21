import { Component } from '@angular/core';

import { ToastComponent } from './toastr/toast.component';
import { ToastrService } from './toastr/toastr.service';
import { ToastPackage } from './toastr/toastr-config';

@Component({
  selector: 'app-bootstrap-toast-component',
  template: `
    <div class="toast" role="alert" [style.display]="state.value === 'inactive' ? 'none' : ''">
      <div class="toast-header">
        <strong class="me-auto">{{ title || 'default header' }}</strong>
        <button type="button" class="btn-close" aria-label="Close" *ngIf="options.closeButton" (click)="remove()"></button>
      </div>
      <div class="toast-body">
        <div role="alert" [attr.aria-label]="message">
          {{ message || 'default message' }}
        </div>
        <div class="mt-2 pt-2 border-top">
          <button type="button" class="btn btn-secondary btn-sm" (click)="handleClick($event)">
            {{ undoString }}
          </button>
        </div>
      </div>
    </div>
  `,
  preserveWhitespaces: false
})
export class BootstrapToastComponent extends ToastComponent {
  // used for comm-acc purposes
  undoString = 'undo';

  // constructor is only necessary when not using AoT
  constructor(protected override toastrService: ToastrService, public override toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  // Demo click handler
  handleClick(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}
