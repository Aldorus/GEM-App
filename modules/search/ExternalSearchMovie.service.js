import {parseOmdbMovieSearchData} from './parseOmdbMovieSearchData';

export default function ExternalSearchMovie(value) {
    // TODO replace the key
    return fetch(`http://www.omdbapi.com/?s=${value}&apikey=c6c0355`)
        .then((response) => response.json())
        .then(parseOmdbMovieSearchData);
}