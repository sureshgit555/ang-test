import {Component, OnInit} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {Subscription} from 'rxjs';
import {ModalConfirmService} from './modal-confirm.service';


@Component({
    selector: 'app-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {
    title: string;
    message: any;
    subscription: Subscription;
    bsModalRef: BsModalRef;
    list: [];
    constructor(private modalconfirm: ModalConfirmService,
        private modalService: BsModalService,
    ) {}

    ngOnInit() {

    }

    




    //    title: string;
    //    closeBtnName: string;
    //    list: any[] = [];
    //
    //    constructor(public bsModalRef: BsModalRef) {}
    //
    //    ngOnInit() {
    //        this.list.push('PROFIT!!!');
    //    }

}
