import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";

import { NgNavigatorShareService } from 'ng-navigator-share';

// Services
import { NavigationService } from "../services/navigation.service";
import { ApiCallService } from "../services/api-call.service";

// Interfaces
import { SearchResult } from "../interfaces/searches";


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  medium = '';
  q = '';
  searchResults: SearchResult[] = [];
  canShare = false;

  constructor(private activatedRoute: ActivatedRoute, private nav: NavigationService, private api: ApiCallService, private http: HttpClient, private webShare: NgNavigatorShareService) { }

  ngOnInit() {
    this.canShare = this.webShare.canShare();

    this.medium = this.activatedRoute.snapshot.params['medium'];
    this.q = this.activatedRoute.snapshot.params['q'];

    const url = `https://api.jikan.moe/v3/search/${this.medium}`
    let params = (new HttpParams()).set('q', this.q)


    this.http
      .get<any>(url, { params: params })
      .toPromise()
      .then(res => {
        const results = res['results'] as any[]
        this.searchResults = results.map(r => {
          return {
            image: r['image_url'],
            title: r['title'],
            synopsis: r['synopsis'],
            url: r['url']
          } as SearchResult
        })
        console.log(this.searchResults)
      })
    // await this.api.initTitles()
    // this.searchResults = this.api.searchResults
    // console.log(this.searchResults)
  }

  goToSearch() {
    this.nav.goToSearch();
  }

  shareThis(idx: number) {
    const r = this.searchResults[idx]
    this.webShare.share({
      title: r.title,
      text: r.synopsis,
      url: r.image
    })
      .catch(e => console.error('WebShare: ', e))
  }
}
