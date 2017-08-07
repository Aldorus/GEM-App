import {capitalizeFirstLetter, replaceAll} from '../../../utilities/extends/string.utils';

const extractMainCategory = (result) => {
    const typeList = result.types;
    return capitalizeFirstLetter(replaceAll(typeList[0], '_', ' '));
};

export const parseGooglePlaceSearchData = (data) => {
    if(data.results) {
        return data.results.slice(0, 5).map((result) => {
            return {
                category: extractMainCategory(result),
                title: result.name,
                shortLabel: result.vicinity
            };
        });
    }
    return [];
};
