// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

// third party
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, SharedModule, FileUploadModule, FormsModule, ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export default class FileUploadComponent {
  // private props
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));

  demoForm = new FormGroup({
    files: this.filesControl
  });

  // public method
  toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  }
}
