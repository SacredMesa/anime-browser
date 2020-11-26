import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  searchResults:any = []

  constructor(private http: HttpClient) { }

  async initTitles() {
    this.searchResults = await this.http.get('http://localhost:3000/search/:medium/:q')
      .toPromise()
    console.log('>> contents ', this.searchResults);
  }
}
