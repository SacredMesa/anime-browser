import { Component, OnInit } from '@angular/core';

// Services
import { NavigationService } from "../services/navigation.service";
import { SaveSearchService } from "../services/save-search.service";

// Interfaces
import { Searches } from "../interfaces/searches";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  searchItems: Searches[] = [];

  constructor(private nav: NavigationService, private searchService: SaveSearchService) { }

  ngOnInit(): void {
    this.searchService.getSearch()
      .then(result => {
        this.searchItems = result.map(s => {
          // @ts-ignore
          s.medium = s.medium == 0 ? 'Anime' : 'Manga'
          console.log(s)
          return s
        })
      })
  }

  goToSearch() {
    this.nav.goToSearch();
  }

}
