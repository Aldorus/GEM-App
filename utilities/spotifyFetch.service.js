import {copyObject} from './extends/object.utils';

const spotifyApiAuthUrl = 'https://accounts.spotify.com/api/token';
const base = 'YTk4M2RkYTk2OGNjNDM5NmI5ZDIwNjM1OWZmYjY3OWI6M2UxZThiZjAxMTM4NDE2OTljNThjZGRmMGY2NjQ2YzU=';
let accessKeySpotify;

const authSpotify = () => {
    return fetch(spotifyApiAuthUrl, {
        method: 'POST',
        header: {
            Authorization: `Basic ${base}`
        },
        body: JSON.stringify({
            grant_type: 'client_credentials'
        })
    }).then((response) => {
        console.log('Spotify auth' ,response);
        if (response.ok) {
            return response.json().then((parsed) => {
                console.log('response', parsed);
                accessKeySpotify = parsed;
                accessKeySpotify.expireAt = new Date().getTime() + parsed.expires_in;
            }).catch((error) => {
                console.log('error in catch', error);
                return {result: true};
            });
        }

        throw new Error(JSON.stringify({response}));
    });
};

const callSpotify = (url, options) => {
    const optionsToSend = copyObject(options);
    optionsToSend.method = 'GET';
    optionsToSend.header = {
        Authorization: `Bearer ${accessKeySpotify.access_token}`
    };
    return fetch(url, optionsToSend);
};

export const spotifyFetch = (url, options = {}) => {
    if (!accessKeySpotify || accessKeySpotify.expireAt > new Date().getTime()) {
        return authSpotify().then(() => callSpotify(url, options));
    }
    return callSpotify(url, options);
};
