import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToSearch() {
    this.router.navigate(['search']);
  }

  goToList() {
    this.router.navigate(['searchlist']);
  }

  // goToResults() {
  //   this.router.navigate(['/search', this.medium, this.searchForm.get('q').value]);
  // }
}

