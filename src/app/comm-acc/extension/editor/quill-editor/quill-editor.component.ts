// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// third Party
import { QuillModule } from 'ngx-quill';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-quill-editor',
  standalone: true,
  imports: [CommonModule, QuillModule, SharedModule],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export default class QuillEditorComponent {}
