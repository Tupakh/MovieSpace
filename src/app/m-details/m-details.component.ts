import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../api.service';
import {map, switchMap} from 'rxjs/operators';

@Component({
    // selector: 'app-m-details',
    templateUrl: './m-details.component.html',
    styleUrls: ['./m-details.component.scss']
})
export class MDetailsComponent implements OnInit {
    title = 'Movie Detail';
    response: any;
    detailedMovie: any;

    constructor(private route: ActivatedRoute, private getData: ApiService) {
    }

    hideloader(): void {
        document.getElementById('loading').style.display = 'none';
    }

    ngOnInit(): void {
        this.route.params
            .pipe(
                map(v => v.id),
                switchMap(id => this.getData.getMovieDetails(id))
            )
            .subscribe(movie => {
                if (Response) {
                    this.hideloader();
                }
                this.detailedMovie = movie;
            });
    }

}
