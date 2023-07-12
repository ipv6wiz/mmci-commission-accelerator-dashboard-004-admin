import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../service/alert.service";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-alert',
    standalone: true,
    imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
    private subscription!: Subscription;
    alert: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.onAlert()
            .subscribe(alert => {
                switch (alert?.type) {
                    case 'success':
                        alert.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        alert.cssClass = 'alert alert-danger';
                        break;
                }

                this.alert = alert;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
