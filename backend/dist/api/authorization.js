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
exports.getAccessToken = exports.fetchProfile = exports.redirectToAuthCodeFlow = void 0;
function redirectToAuthCodeFlow(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        const verifier = generateCodeVerifier(128);
        const challenge = yield generateCodeChallenge(verifier);
        sessionStorage.setItem("verifier", verifier);
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "http://localhost:5173/");
        params.append("scope", "user-read-private user-read-email user-top-read");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);
        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    });
}
exports.redirectToAuthCodeFlow = redirectToAuthCodeFlow;
function fetchProfile(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Access token: ", code);
        const result = yield fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${code}` }
        });
        sessionStorage.setItem("profile", JSON.stringify(yield result.json()));
    });
}
exports.fetchProfile = fetchProfile;
function getAccessToken(clientId, code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Getting access token");
        const verifier = sessionStorage.getItem("verifier");
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:5173/");
        params.append("code_verifier", verifier);
        const result = yield fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });
        const { access_token } = yield result.json();
        if (!access_token) {
            throw new Error("Couldn't get access token");
        }
        else {
            console.log("Got token: ", access_token);
            sessionStorage.setItem("token", access_token);
        }
    });
}
exports.getAccessToken = getAccessToken;
function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function generateCodeChallenge(codeVerifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = yield window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    });
}
