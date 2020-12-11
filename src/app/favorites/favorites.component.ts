import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../api.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    title: string;
    loading: boolean;
    error: string;
    favoritesMovies: any[];

    constructor(private http: HttpClient, private getData: ApiService) {
        this.loading = false;
        this.title = 'Your Favorites Movies List';
        this.loading = true;
        this.favoritesMovies = [];
    }

    getInitFavoriteMovies(): void {
        this.loading = true;
        this.getData.getAllFavoriteMovies()
            .subscribe(result => {
                    // console.log('getAllFavoriteMovies', result);
                    this.favoritesMovies = result.results;
                    this.loading = false;
                },
                error => {
                    console.log('getAllFavoriteMovies', error);
                    this.error = error;
                });
    }

    addRemoveFavorite(movieID: number): void {
        this.getData.addRemoveFavorite(movieID, true)
            .subscribe(
                () => {
                    this.favoritesMovies = this.favoritesMovies.filter(element => element.id !== movieID);
                },
                error => {
                    this.error = error;
                }
            );
    }

    ngOnInit(): void {
        this.getInitFavoriteMovies();
    }
}
