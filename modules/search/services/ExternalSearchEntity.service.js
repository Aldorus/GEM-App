import {parseGoogleEntitySearchData} from '../parsers/parseGoogleEntitySearchData';

export default function ExternalSearchEntity(value, index) {
    return fetch(`https://kgsearch.googleapis.com/v1/entities:search?query=${value}&key=AIzaSyByEvdNxZqKVHZphCkeW4o0j1gR3INSLSg&limit=1&indent=True`)
        .then((response) => response.json())
        .then(parseGoogleEntitySearchData)
        .then((response) => {
            return {
                response,
                index
            };
        });
}