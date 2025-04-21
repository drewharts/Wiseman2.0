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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = 3000;
// Your Spotify credentials
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID || '';
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
// Variables to store your access and refresh tokens
let accessToken = process.env.SPOTIFY_ACCESS_TOKEN || '';
let refreshToken = process.env.SPOTIFY_REFRESH_TOKEN || '';
// Function to refresh the access token
function refreshAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = new URLSearchParams();
            params.append('grant_type', 'refresh_token');
            params.append('refresh_token', refreshToken);
            params.append('client_id', spotifyClientId);
            params.append('client_secret', spotifyClientSecret);
            const response = yield axios_1.default.post('https://accounts.spotify.com/api/token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            accessToken = response.data.access_token;
            // Set up a timer to refresh the token again before it expires
            setTimeout(refreshAccessToken, response.data.expires_in * 1000);
        }
        catch (error) {
            console.error('Error refreshing access token:', error);
        }
    });
}
// Function to fetch your top artists
let cachedTopArtists = null;
function fetchTopArtists() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!accessToken)
            return;
        try {
            const response = yield axios_1.default.get('https://api.spotify.com/v1/me/top/artists', {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            cachedTopArtists = response.data;
            // Refresh the data every hour (or choose your own interval)
            setTimeout(fetchTopArtists, 3600000);
        }
        catch (error) {
            console.error('Error fetching top artists:', error);
        }
    });
}
refreshAccessToken();
fetchTopArtists();
// app.get('/my-top-artists', (req, res) => {
//   res.send('Top Artists Endpoint Reached');
// });
//Endpoint to get your top artists
app.get('/my-top-artists', (req, res) => {
    if (cachedTopArtists) {
        res.json(cachedTopArtists);
    }
    else {
        res.status(500).send('Top artists data is not available at the moment.');
    }
});
app.get('/', (req, res) => {
    res.send('Welcome to the Spotify Integration Server');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
