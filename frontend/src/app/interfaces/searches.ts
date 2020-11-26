export enum Medium {
  anime, manga
}

export interface Searches {
  id?: number,
  q: string,
  medium: Medium
}

export interface SearchResult {
  image: string,
  title: string,
  synopsis: string,
  url: string
}