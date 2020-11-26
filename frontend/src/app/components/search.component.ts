import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

// Services
import { NavigationService } from "../services/navigation.service";
import { SaveSearchService, normaliseSearchText } from "../services/save-search.service";

// Interfaces
import { Searches, Medium } from "../interfaces/searches";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  medium = 'anime'

  searchForm: FormGroup

  constructor(private router: Router, private nav: NavigationService, private fb: FormBuilder, private searchService: SaveSearchService) { }

  ngOnInit(): void {
    this.searchForm = this.createSearch()
  }

  goToList() {
    this.nav.goToList();
  }

  goToResult() {
    const q = normaliseSearchText(this.searchForm.get('q').value)
    this.router.navigate(['/search', this.medium, q]);
  }

  setMedium(g: string) {
      this.medium = g;
      console.log('medium: ', this.medium)
  }

  private createSearch(): FormGroup {
    return this.fb.group({
      q: this.fb.control('', [Validators.required]),
    })
  }

  async saveOptions() {
    const opt: Searches = {
      q: this.searchForm.get('q').value,
      medium: this.medium == 'anime' ? Medium.anime : Medium.manga
    }

    await this.searchService.saveSearch(opt)

    this.goToResult();
  }





}
