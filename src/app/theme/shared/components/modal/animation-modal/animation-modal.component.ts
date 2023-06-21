// Angular Import
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-animation-modal',
  templateUrl: './animation-modal.component.html',
  styleUrls: ['./animation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnimationModalComponent {
  // public props
  @Input() modalClass!: string;
  @Input() contentClass!: string;
  @Input() modalID!: string;
  @Input() backDrop = false;

  // public method
  close(event: string) {
    (document.querySelector('#' + event) as HTMLElement).classList.remove('md-show');
  }
}
