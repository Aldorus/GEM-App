import {parseOmdbMovieSearchData} from './parseOmdbMovieSearchData';

export default function ExternalSearchMovie(value) {
    return fetch(`http://www.omdbapi.com/?s=${value}&apikey=7637c59e`)
        .then((response) => response.json())
        .then(parseOmdbMovieSearchData);
}