import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Player} from './home/player';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    PHP_API_SERVER = "http://127.0.0.1:8000";
    players: Player[];
    selectedPlayer: Player;
    constructor(private httpClient: HttpClient) {}

    readPolicies(): Observable<Player[]> {
        return this.httpClient.get<Player[]>(`${this.PHP_API_SERVER}/api/players`).pipe(
            map((res) => {
                this.players = res['data'];
                return this.players;
            }), catchError(this.handleError));

    }

    createPolicy(player: Player): Observable<Player[]> {
        return this.httpClient.post<Player>(`${this.PHP_API_SERVER}/api/players`, player).pipe(
            map((res) => {
                this.players.push(res['data']);
                return this.players;
            }),
            catchError(this.handleError));

    }

    updatePlayer(player: Player, id: number): Observable<Player> {
        return this.httpClient.post<Player>(`${this.PHP_API_SERVER}/api/players/${id}`, player);
    }

    readPlayer(id: number): Observable<Player> {
        return this.httpClient.get<Player>(`${this.PHP_API_SERVER}/api/players/${id}`).pipe(
            map((res) => {
                this.selectedPlayer = res['data'];
                return this.selectedPlayer;
            }),
            catchError(this.handleError)
        );
    }

    deletePlayer(id: number) {
        return this.httpClient.delete<Player>(`${this.PHP_API_SERVER}/api/players/${id}`).pipe(
            map((res) => {
                this.selectedPlayer = res['data'];
                return this.selectedPlayer;
            }),
            catchError(this.handleError)
        );
    }

    handleError(error: HttpErrorResponse) {
        return throwError('Error! something went wrong.');
    }
}
