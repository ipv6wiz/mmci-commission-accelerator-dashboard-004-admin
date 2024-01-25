import { Component } from '@angular/core';
import packageJSON from '../../../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    private pkg: any = packageJSON;
    version = this.pkg.version;
}
