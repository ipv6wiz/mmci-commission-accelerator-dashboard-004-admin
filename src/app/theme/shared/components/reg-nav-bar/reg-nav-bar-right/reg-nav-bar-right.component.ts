import { Component } from '@angular/core';
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../../../service";
import {Client} from "../../../entities/client.interface";

@Component({
  selector: 'app-reg-nav-bar-right',
  providers: [NgbDropdownConfig],
  templateUrl: './reg-nav-bar-right.component.html',
  styleUrls: ['./reg-nav-bar-right.component.scss']
})
export class RegNavBarRightComponent {
    currentUserImage: string;
    currentUser: Client = {} as Client;
    logoutTooltip: string = 'Logout';
    constructor(public authService:AuthenticationService) {
        this.currentUser = this.authService.getLocalClientData();
        if(!!this.currentUser.photoURL) {
            this.currentUserImage = this.currentUser.photoURL;
        } else {
            this.currentUserImage = 'assets/images/user/default-user.png';
        }
    }
}
