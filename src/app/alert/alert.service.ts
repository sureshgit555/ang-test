import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {Alert, AlertType} from './alert';

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    private subject = new Subject<Alert>();

    success(message: string) {
        this.alert(AlertType.Success, message);
    }

    error(message: string) {
        this.alert(AlertType.Error, message);
    }

    //    sendMessage(message: string) {
    //        this.subject.next({text: message});
    //    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    alert(type: AlertType, message: string) {
        this.subject.next(<Alert> {type: type, message: message});
    }

}
