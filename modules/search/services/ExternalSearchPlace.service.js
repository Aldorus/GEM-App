import {parseGooglePlaceSearchData} from '../parsers/parseGooglePlaceSearchData';

export default function ExternalSearchPlace(value) {
    // TODO get the current geoloc
    return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.5106127,-73.5676309&radius=5000&keyword=${value}&key=AIzaSyByEvdNxZqKVHZphCkeW4o0j1gR3INSLSg`)
        .then((response) => response.json())
        .then(parseGooglePlaceSearchData);
}