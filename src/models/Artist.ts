import { Image } from "./image";

export type Artist = {
    external_urls: any;
    followers?: any;
    genres?: string[];
    href: string;
    id: string;
    images?: Image[];
    name: string;
    popularity?: number;
    type: string;
    uri: string;
};