import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators'
import {MessageService} from '../messages/message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    private heroesUrl = 'http://127.0.0.1:8000/api/heroes';
    hereos: Hero[];
    constructor(private messageService: MessageService,
        private http: HttpClient, ) {}

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl).pipe(
            map((res) => {
                return res['data'];
            }), catchError(this.handleError<Hero[]>('getHeroes', []))
        );

    }

    getHero(id: number): Observable<Hero> {
        // TODO: send the message _after_ fetching the hero
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            map((res) => {
                return res['data'];
            }), catchError(this.handleError<Hero>('getHero id=${id}'))
        );
    }

    /* GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Hero[]>(`${this.heroesUrl}/search/${term}`).pipe(
            map((res) => {
                return res['data'];
            }), catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };


    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}