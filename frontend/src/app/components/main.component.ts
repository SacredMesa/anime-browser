import { Component, OnInit, NgZone } from '@angular/core';

// Services
import { NavigationService } from "../services/navigation.service";

// Misc
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/MenheraChan.json'
  }

  constructor(private nav: NavigationService, private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  onLoopComplete() {
    this.ngZone.run(() => {
      this.nav.goToList();
    });
  }

}
