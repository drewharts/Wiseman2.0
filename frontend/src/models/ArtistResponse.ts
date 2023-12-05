import { Artists } from "./Artists";

export interface ArtistResponse {
    items: Artists[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    previous: null | string;
    next: null | string;
  }