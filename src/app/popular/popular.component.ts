import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../api.service';
import {FavoritesComponent} from '../favorites/favorites.component';

@Component({
    selector: 'app-popular',
    templateUrl: './popular.component.html',
    styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
    title = 'Most Popular Movies';
    response: any;
    error: string;
    popularMovies = [];
    page = 1;
    pageSize = 20;
    totalPages: number;
    totalResults: number;

    constructor(private http: HttpClient, private getData: ApiService) {
    }

    hideloader(): void {
        document.getElementById('loading').style.display = 'none';
    }

    pageChange(page): void {
        // console.log('pageChange', page);
        this.page = page;
        this.getInitPopularMovies();
    }

    getInitPopularMovies(): void {
        this.getData.getAllPopularMovies(this.page).subscribe(movie => {
            if (movie) {
                this.hideloader();
            }
            movie.results.map(val => {
                this.getData.getFavoriteMovie(val.id).subscribe(movieF => {
                    // console.log('getPopularMovies Fav', movieF.favorite);
                    val.favorite = movieF.favorite;
                    return val;
                });
            });
            // console.log('getPopularMovies Fav', movie);
            this.popularMovies = movie.results;
            this.page = movie.page;
            this.totalPages = movie.total_pages;
            this.totalResults = movie.total_results;
        });
    }

    addRemoveFavorite(movieID, movieFav): void {
        this.getData.addRemoveFavorite(movieID, movieFav)
            .subscribe(
                () => {
                    this.popularMovies.find(element => element.id === movieID).favorite = !movieFav;
                    const myCompFavMov = new FavoritesComponent(this.http, this.getData);
                    myCompFavMov.ngOnInit();
                },
                error => {
                    this.error = error;
                }
            );
    }

    ngOnInit(): void {
        this.getInitPopularMovies();
    }
}
