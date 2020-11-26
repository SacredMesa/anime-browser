import { Component } from '@angular/core';

// Services
import { NavigationService } from "./services/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anime-browser';

  constructor(private nav: NavigationService) {}

  goToList() {
    this.nav.goToList()
  }

}
