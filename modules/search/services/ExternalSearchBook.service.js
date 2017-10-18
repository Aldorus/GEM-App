import {parseGoogleBookSearchData} from '../parsers/parseGoogleBookSearchData';

export default function ExternalSearchBook(value, index) {
    // TODO replace the key
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyByEvdNxZqKVHZphCkeW4o0j1gR3INSLSg`)
        .then((response) => response.json())
        .then(parseGoogleBookSearchData).then((response) => {
            return {
                response,
                index
            };
        });
}
