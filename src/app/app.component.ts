import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Movie Space';
    searchFilter: any;
    navbarOpen = false;

    constructor(
        private route: Router) {
    }

    searchMovies(searchFilter): void {
        this.route.navigate(['/search/' + searchFilter]);
        this.searchFilter = '';
        this.navbarOpen = !this.navbarOpen;
    }

    toggleNavbar(): void {
        this.navbarOpen = !this.navbarOpen;
    }

    ngOnInit(): void {
        // this.searchMovies();
    }
}
