import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-adv-modal',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './adv-modal.component.html',
  styleUrls: ['./adv-modal.component.scss']
})
export default class AdvModalComponent {
  // public Method
  openMyModal(event: string) {
    document.querySelector('#' + event)?.classList.add('md-show');
  }

  closeMyModal(event: {
    target: { parentElement: { parentElement: { parentElement: { classList: { remove: (arg0: string) => void } } } } };
  }) {
    event.target.parentElement.parentElement.parentElement.classList.remove('md-show');
  }
}
