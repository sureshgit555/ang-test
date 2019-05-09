import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
;

@Injectable({
    providedIn: 'root'
})

export class ModalConfirmService {

    private subject = new Subject<any>();
    private subjectAction = new Subject<any>();

    openModal(message: string) {
        this.modal(message);
    }

    getModal(): Observable<any> {
        return this.subject.asObservable();
    }

    getModalAction(): Observable<any> {
        return this.subjectAction.asObservable();
    }

    confirmModalAction() {
        this.subjectAction.next();
    }

    modal(message: string) {
        this.subject.next({message: message});
    }



}
