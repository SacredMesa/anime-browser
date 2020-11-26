import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Components
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search.component';
import { SearchListComponent } from './components/search-list.component';
import { ResultsComponent } from './components/results.component';
import { MainComponent } from './components/main.component';

// Services
import { NavigationService } from "./services/navigation.service";
import { SaveSearchService } from "./services/save-search.service";

// Angular Material
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Lottie Animations
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'search', component: SearchComponent },
  { path: 'searchlist', component: SearchListComponent },
  { path: 'search/:medium/:q', component: ResultsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchListComponent,
    ResultsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({
      player: playerFactory
    })
  ],
  providers: [
    NavigationService,
    SaveSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
