import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../theme/shared/service";
import {AlertComponent} from "../../../../theme/shared/components/alert/alert.component";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {User} from "../../../../theme/shared/entities/user.interface";
@Component({
    selector: 'app-verify-email',
    standalone: true,
    templateUrl: './verify-email.component.html',
    imports: [
        AlertComponent,
        NgIf,
        RouterLink
    ],
    styleUrls: ['./verify-email.component.scss']
})
export default class VerifyEmailComponent implements OnInit {
    user: User;
    constructor(
        public authService: AuthenticationService
    ) {
        this.user = this.authService.getLocalUserData();
    }
    ngOnInit() {

    }
}
