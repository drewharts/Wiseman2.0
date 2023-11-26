import express from 'express';
import axios from 'axios';
require('dotenv').config();

const app = express();
const port = 3000;

// Your Spotify credentials
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID || '';
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';

// Variables to store your access and refresh tokens
let accessToken: string = process.env.SPOTIFY_ACCESS_TOKEN || '';
let refreshToken: string = process.env.SPOTIFY_REFRESH_TOKEN || '';


// Function to refresh the access token
async function refreshAccessToken() {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', spotifyClientId);
    params.append('client_secret', spotifyClientSecret);

    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    accessToken = response.data.access_token;
    // Set up a timer to refresh the token again before it expires
    setTimeout(refreshAccessToken, response.data.expires_in * 1000);
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}


// Function to fetch your top artists
let cachedTopArtists: any = null;
async function fetchTopArtists() {
  if (!accessToken) return;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    cachedTopArtists = response.data;
    // Refresh the data every hour (or choose your own interval)
    setTimeout(fetchTopArtists, 3600000);
  } catch (error) {
    console.error('Error fetching top artists:', error);
  }
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
  } else {
    res.status(500).send('Top artists data is not available at the moment.');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Spotify Integration Server');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
