import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Player} from './player';
import {ApiService} from '../api.service';
import {AlertService} from '../alert/alert.service';
import {ModalConfirmService} from '../modal-confirm/modal-confirm.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    players: Player[];
    selectedPlayer: Player;
    error = '';
    success = '';
    registerForm: FormGroup;
    submitted = false;
    modalRef: BsModalRef;



    constructor(private apiService: ApiService,
        private formBuilder: FormBuilder,
        private modalService: BsModalService,
        private alertService: AlertService,
    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
        });

        this.getPlayers();


    }

    get f() {
        return this.registerForm.controls;
    }

    getPlayers(): void {
        this.apiService.readPolicies().subscribe(
            (players: Player[]) => {
                this.players = players;
            }, (err) => {
                this.error = err;
            })
    }

    createOrUpdatePolicy(form) {

        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        if (this.selectedPlayer && this.selectedPlayer.id) {
            form.value.id = this.selectedPlayer.id;
            this.apiService.updatePlayer(form.value, this.selectedPlayer.id).subscribe((players: Player) => {
                this.alertService.success('Updated successfully');
                this.selectedPlayer = null;
                this.getPlayers();
            },
                (err) => this.alertService.error(err));
        }
        else {
            this.apiService.createPolicy(form.value).subscribe((player: Player[]) => {
                this.alertService.success('Created successfully');
                this.selectedPlayer = null;
                this.getPlayers();
            },
                (err) => this.alertService.error(err));
        }

        form.reset();
        this.submitted = false;
    }

    showPlayer(id) {
        this.apiService.readPlayer(id).subscribe((players: Player) => {
            this.selectedPlayer = players;
            this.registerForm.setValue({
                first_name: players.first_name,
                last_name: players.last_name,
            })
        })
    }

    deletePlayer(id) {
        this.apiService.deletePlayer(id).subscribe((players: Player) => {
            this.alertService.success('Deleted successfully');
            this.getPlayers();
        },
            (err) => this.alertService.error(err));
    }

    openModal(players: Player, template: TemplateRef<any>) {

        //        this.modalConfirmService.openModal('sdsd');
        //
        this.selectedPlayer = players;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
        //
        //        this.modalConfirmService.getModalAction().subscribe((message) => {
        //            console.log('sdsd');
        //        });
        //        const initialState = {
        //            title: 'Modal with components',
        //            class: 'modal-sm'
        //        };
        //        this.modalRef = this.modalService.show(ModalConfirmComponent, {initialState});
        //        console.log(this.modalRef.hide());

    }




    confirm(): void {
        this.deletePlayer(this.selectedPlayer.id);
        this.modalRef.hide();
        this.selectedPlayer = null;
    }
    decline(): void {
        this.modalRef.hide();
    }

}   