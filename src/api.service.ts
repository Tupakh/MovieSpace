import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private BASE_API_URL = 'https://api.themoviedb.org/';
    private API_KEY = 'd4e1208775f522c1ec8ddad02fa77144';
    private SESSION_ID = '89f1b62a25956f3cc814cf45dc964421b979eb51';
    private BEARER_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGUxMjA4Nzc1ZjUyMmMxZWM4ZGRhZDAyZmE3NzE0NCIsInN1YiI6IjVmYTY4YzZkNTE5YmJiMDAzYzUxZWI3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.78WE_WBsTIXLwo2xv5DA-yq1ChPF14yFpznR5kOOROM';

    constructor(private http: HttpClient) {
    }

    private static handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }

    getMovieDetails(movieID: number): Observable<any> {
        // console.log('getMovieDetails', movieID);
        return this.http.get(this.BASE_API_URL + '/3/movie/' + movieID + '?api_key=' + this.API_KEY);
    }

    getFavoriteMovie(movieID: number): Observable<any> {
        // console.log('getFavoriteMovie', movieID);
        return this.http.get(
            this.BASE_API_URL + '3/movie/' + movieID + '/account_states?api_key=' + this.API_KEY + '&session_id=' + this.SESSION_ID);
    }

    getAllPopularMovies(page: number): Observable<any> {
        // console.log('getAllPopularMovies');
        return this.http.get(this.BASE_API_URL + '3/movie/popular?api_key=' + this.API_KEY + '&page=' + page);
    }

    getAllFavoriteMovies(): Observable<any> {
        const headers = {Authorization: 'Bearer ' + this.BEARER_KEY};
        // console.log('getAllFavoriteMovies');
        return this.http.get(this.BASE_API_URL + '4/account/5fa68c6d519bbb003c51eb77/movie/favorites', {headers})
            .pipe(catchError(ApiService.handleError));
    }

    addRemoveFavorite(movieID: number, movieFav: boolean): Observable<any> {
        // console.log('addRemoveFavorite');
        const headers = {'Content-Type': 'application/json;charset=utf-8'};
        const body = {
            media_type: 'movie',
            media_id: movieID,
            favorite: !movieFav
        };
        return this.http.post(
            this.BASE_API_URL + '3/account/{account_id}/favorite?api_key=' + this.API_KEY + '&session_id=' + this.SESSION_ID,
            body, {headers})
            .pipe(catchError(ApiService.handleError));
    }

    searchMovies(searchText: string): Observable<any> {
        // console.log('searchMovies');
        return this.http.get(this.BASE_API_URL + '3/search/movie?api_key=' + this.API_KEY + '&query=' + searchText);
    }
}
