import { Injectable } from '@angular/core';
import Dexie from "dexie";
import { Searches } from "../interfaces/searches";

export const normaliseSearchText = (q: string) => q.trim().toLowerCase();

@Injectable({
  providedIn: 'root'
})

export class SaveSearchService extends Dexie {

  private searches: Dexie.Table<Searches, number>;

  constructor() {
    super('searchdb')

    this.version(1).stores({
      searches: "++id, q"
    })

    this.searches = this.table('searches')
  }

  async saveSearch(s: Searches): Promise<any> {
    s.q = normaliseSearchText(s.q);
    // Select count(*) from from searches where q = 'sqb' and genre = 'anime'
    const resultCount = await this.searches
      .where('q').equals(s.q)
      .and(doc => doc.medium == s.medium)
      .count()

      if (resultCount <= 0) {
        return await this.searches.add(s)
      }
  }

  async getSearch(): Promise<Searches[]> {
    return await this.searches.orderBy('q').toArray()
  }

}