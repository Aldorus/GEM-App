import {capitalizeFirstLetter, replaceAll} from '../../../utilities/extends/string.utils';

const extractMainCategory = (result) => {
    const typeList = result.types;
    return capitalizeFirstLetter(replaceAll(typeList[0], '_', ' '));
};

const getImage = (result) => {
    if (result && result.photos && result.photos.length) {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=AIzaSyByEvdNxZqKVHZphCkeW4o0j1gR3INSLSg`;
    }
};

export const parseGooglePlaceSearchData = (data) => {
    if (data.results) {
        return data.results.slice(0, 5).map((result) => {
            return {
                key: `place:${result.id}`,
                category: extractMainCategory(result),
                unformatedCategory: result.types[0],
                title: result.name,
                image: getImage(result),
                shortLabel: result.vicinity
            };
        });
    }
    return [];
};
