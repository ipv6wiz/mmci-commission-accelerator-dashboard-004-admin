import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../theme/shared/shared.module";

@Component({
  selector: 'app-client-verify',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './client-verify.component.html',
  styleUrls: ['./client-verify.component.scss']
})
export class ClientVerifyComponent implements OnInit {
    @Input() clientData: any = {data: 'Some Data'};

    constructor() {}

    ngOnInit() {
        console.log('ClientVerifyComponent - clientData: ', this.clientData);
    }


    protected readonly JSON = JSON;
}
