import {parseOmdbMovieSearchData} from '../parsers/parseOmdbMovieSearchData';

export default function ExternalSearchMovie(value, index) {
    return fetch(`http://www.omdbapi.com/?s=${value}&apikey=7637c59e`)
        .then((response) => response.json())
        .then(parseOmdbMovieSearchData).then((response) => {
            return {
                response,
                index
            };
        });
}