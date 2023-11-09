import { Track } from "../model/Track";
import { Artist } from "../model/Artist";
import { UserProfile } from "../model/UserProfile";

export enum TimeFrame {
    short_term = "short_term",
    medium_term = "medium_term",
    long_term = "long_term"
}

// `getTopTracks(accessToken, limit: 5, timeFrame: short_term) -> Tracks[]`
// Gets a list of users top tracks over a time period. Returns a list of track objects.
export const getTopTracks = async (accessToken: string, limit: number, timeFrame: TimeFrame): Promise<Track[]> => {
    const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeFrame}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { items } = await result.json();
    return items as Track[];
}

// `getTopArtists(accessToken, limit: 5, timeFrame: short_term) -> Artist[]`
// Gets a list of users top artists over a time period. Returns a list of artist objects.
export const getTopArtists = async (accessToken: string, limit: number, timeFrame: TimeFrame): Promise<Artist[]> => {
    const result = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeFrame}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { items } = await result.json();
    return items as Artist[];
}

export const getUserProfile = async (accessToken: string): Promise<UserProfile> => {
    const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=long_term`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { items } = await result.json();
    const ids = items.map((track: Track) => track.id).join(",");
    const audioFeatures = await fetch(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    let audioFeaturesItems = (await audioFeatures.json()).audio_features;
    const audioFeaturesMap = new Map<string, any>();
    const dropFeatures = [ "type", "id", "uri", "track_href", "analysis_url"]
    audioFeaturesItems.map((item: any) => {
        for( let key in item){
            if(dropFeatures.includes(key)) continue;
            audioFeaturesMap.set(key, item[key]+( audioFeaturesMap.has(key) ? audioFeaturesMap.get(key) : 0))
        }
    })
    for (let [key, value] of audioFeaturesMap.entries()) {
        audioFeaturesMap.set(key, value/items.length)
    }
    return Object.fromEntries(audioFeaturesMap) as UserProfile
}