import {Component, OnInit} from '@angular/core';
import {Alert, AlertType} from './alert';
import {Subscription} from 'rxjs';
import {AlertService} from './alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

    alerts = [];
    message: any;
    subscription: Subscription;
    constructor(private messageService: AlertService) {}

    ngOnInit() {
        this.subscription = this.messageService.getMessage().subscribe((alert: Alert) => {
            this.alerts.push({
                type: this.alertType(alert.type),
                msg: alert.message,
                timeout: 5000
            });
        });
    }


    onClosed(dismissedAlert: AlertComponent): void {
        this.alerts = this.alerts.filter(x => x !== dismissedAlert);
    }


    alertType(alertType: AlertType) {
        switch (alertType) {
            case AlertType.Success:
                return 'success';
            case AlertType.Error:
                return 'danger';
        }


    }
}
