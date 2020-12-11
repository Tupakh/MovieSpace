import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {HomeComponent} from './home/home.component';
import {PopularComponent} from './popular/popular.component';
import {SearchComponent} from './search/search.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MDetailsComponent} from './m-details/m-details.component';
import {RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        FavoritesComponent,
        HomeComponent,
        PopularComponent,
        SearchComponent,
        MDetailsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'search/:search', component: SearchComponent},
            {path: 'popular', component: PopularComponent},
            {path: 'popular/:id', component: MDetailsComponent},
            {path: 'favorites', component: FavoritesComponent},
            {path: 'favorites/:id', component: MDetailsComponent},
            {path: '**', redirectTo: '/', pathMatch: 'full'}
        ]),
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
