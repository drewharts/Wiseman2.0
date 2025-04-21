"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.getTopArtists = exports.getTopTracks = exports.TimeFrame = void 0;
var TimeFrame;
(function (TimeFrame) {
    TimeFrame["short_term"] = "short_term";
    TimeFrame["medium_term"] = "medium_term";
    TimeFrame["long_term"] = "long_term";
})(TimeFrame || (exports.TimeFrame = TimeFrame = {}));
// `getTopTracks(accessToken, limit: 5, timeFrame: short_term) -> Tracks[]`
// Gets a list of users top tracks over a time period. Returns a list of track objects.
const getTopTracks = (accessToken, limit, timeFrame) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeFrame}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { items } = yield result.json();
    return items;
});
exports.getTopTracks = getTopTracks;
// `getTopArtists(accessToken, limit: 5, timeFrame: short_term) -> Artist[]`
// Gets a list of users top artists over a time period. Returns a list of artist objects.
const getTopArtists = (accessToken, limit, timeFrame) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeFrame}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { items } = yield result.json();
    return items;
});
exports.getTopArtists = getTopArtists;
const getUserProfile = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch(`https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=long_term`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const { items } = yield result.json();
    const ids = items.map((track) => track.id).join(",");
    const audioFeatures = yield fetch(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    let audioFeaturesItems = (yield audioFeatures.json()).audio_features;
    const audioFeaturesMap = new Map();
    const dropFeatures = ["type", "id", "uri", "track_href", "analysis_url"];
    audioFeaturesItems.map((item) => {
        for (let key in item) {
            if (dropFeatures.includes(key))
                continue;
            audioFeaturesMap.set(key, item[key] + (audioFeaturesMap.has(key) ? audioFeaturesMap.get(key) : 0));
        }
    });
    for (let [key, value] of audioFeaturesMap.entries()) {
        audioFeaturesMap.set(key, value / items.length);
    }
    return Object.fromEntries(audioFeaturesMap);
});
exports.getUserProfile = getUserProfile;
