// angular import
import { Component, ElementRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// bootstrap import
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic-offcanvas',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-offcanvas.component.html',
  styleUrls: ['./basic-offcanvas.component.scss']
})
export default class BasicOffcanvasComponent {
  // private props
  closeResult = 'string';

  // constructor
  constructor(private offcanvasService: NgbOffcanvas) {}

  // private method
  open(content: ElementRef) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openTop(content1: TemplateRef<string>) {
    this.offcanvasService.open(content1, { position: 'top' });
  }

  openEnd(content: TemplateRef<string>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  openBottom(content1: TemplateRef<string>) {
    this.offcanvasService.open(content1, { position: 'bottom' });
  }

  openScroll(content: TemplateRef<string>) {
    this.offcanvasService.open(content, { scroll: true });
  }

  openBackdrop(content: TemplateRef<string>) {
    this.offcanvasService.open(content, { backdrop: true });
  }

  openBothOptions(content: TemplateRef<string>) {
    this.offcanvasService.open(content, { backdrop: true, scroll: true });
  }

  // private method
  private getDismissReason(reason: OffcanvasDismissReasons): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
