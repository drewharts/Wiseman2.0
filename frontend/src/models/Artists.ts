import { Followers } from "./Followers"; 
import { Image } from "./Image"

export interface Artists {
    external_urls: {
      spotify: string;
    };
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }
  