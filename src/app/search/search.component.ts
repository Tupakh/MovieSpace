import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../api.service';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    title = 'Results';
    searchFilter: any;
    searchedMovies = [];

    constructor(private http: HttpClient, private route: ActivatedRoute, private getData: ApiService) {
    }

    hideloader(): void {
        document.getElementById('loading').style.display = 'none';
    }

    addRemoveFavorite(movieID, movieFav): void {
        this.getData.addRemoveFavorite(movieID, movieFav).subscribe(() => this.ngOnInit());
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(v => {
                    this.searchFilter = v.search;
                    return v.search;
                }),
                switchMap(search => this.getData.searchMovies(search))
            )
            .subscribe(searchMovie => {
                if (searchMovie) {
                    this.hideloader();
                }
                searchMovie.results.map(val => {
                    this.getData.getFavoriteMovie(val.id).subscribe(movieF => {
                        // console.log('searchMovie Fav', movieF.favorite);
                        val.favorite = movieF.favorite;
                        return val;
                    });
                });
                this.searchedMovies = searchMovie.results;
            });
    }
}
