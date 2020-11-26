export enum Medium {
  anime, manga
}

export interface Searches {
  id?: number,
  q: string,
  medium: Medium
}
