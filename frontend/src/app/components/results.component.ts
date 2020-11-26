import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Services
import { NavigationService } from "../services/navigation.service";


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  medium = ''
  q = ''

  constructor(private activatedRoute: ActivatedRoute, private nav: NavigationService) { }

  ngOnInit(): void {
    this.medium = this.activatedRoute.snapshot.params['medium'];
    this.q = this.activatedRoute.snapshot.params['q'];
  }

  goToSearch() {
    this.nav.goToSearch();
  }



}
