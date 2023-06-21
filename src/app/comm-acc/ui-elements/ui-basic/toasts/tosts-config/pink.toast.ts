import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

import { ToastComponent } from './toastr/toast.component';
import { ToastrService } from './toastr/toastr.service';
import { ToastPackage } from './toastr/toastr-config';

@Component({
  selector: 'app-pink-toast-component',
  styles: [
    `
      :host {
        background-color: #ff69b4;
        position: relative;
        overflow: hidden;
        margin: 0 0 6px;
        padding: 10px 10px 10px 10px;
        width: 300px;
        border-radius: 3px 3px 3px 3px;
        color: #ffffff;
        pointer-events: all;
        cursor: pointer;
      }
      .btn-pink {
        -webkit-backface-visibility: hidden;
        -webkit-transform: translateZ(0);
      }
    `
  ],
  template: `
    <div class="row" [style.display]="state.value === 'inactive' ? 'none' : ''">
      <div class="col-9">
        <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
          {{ title }}
        </div>
        <div *ngIf="message && options.enableHtml" role="alert" [class]="options.messageClass" [innerHTML]="message"> </div>
        <div *ngIf="message && !options.enableHtml" role="alert" [class]="options.messageClass" [attr.aria-label]="message">
          {{ message }}
        </div>
      </div>
      <div class="col-3 text-right">
        <a *ngIf="!options.closeButton" class="btn btn-pink btn-sm" (click)="action($event)">
          {{ undoString }}
        </a>
        <a *ngIf="options.closeButton" (click)="remove()" class="btn btn-pink btn-sm"> close </a>
      </div>
    </div>
    <div *ngIf="options.progressBar">
      <div class="toast-progress" [style.width]="width + '%'"></div>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          opacity: 0
        })
      ),
      transition(
        'inactive => active',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
              opacity: 0
            }),
            style({
              transform: 'skewX(20deg)',
              opacity: 1
            }),
            style({
              transform: 'skewX(-5deg)',
              opacity: 1
            }),
            style({
              transform: 'none',
              opacity: 1
            })
          ])
        )
      ),
      transition(
        'active => removed',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              opacity: 1
            }),
            style({
              transform: 'translate3d(100%, 0, 0) skewX(30deg)',
              opacity: 0
            })
          ])
        )
      )
    ])
  ],
  preserveWhitespaces: false
})
export class PinkToastComponent extends ToastComponent {
  // used for comm-acc purposes
  undoString = 'undo';

  // constructor is only necessary when not using AoT
  constructor(protected override toastrService: ToastrService, public override toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}
