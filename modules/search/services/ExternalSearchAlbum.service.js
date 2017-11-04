import {spotifyFetch} from '../../../utilities/spotifyFetch.service';
import {parseSpotifyAlbumSearchData} from '../parsers/parseSpotifyAlbumSearchData';

export default function ExternalSearchAlbum(value, index) {
    return spotifyFetch(`https://api.spotify.com/v1/search?q=${value}`)
        .then((response) => response.json())
        .then(parseSpotifyAlbumSearchData).then((response) => {
            return {
                response,
                index
            };
        });
}
