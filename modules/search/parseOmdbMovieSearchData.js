import {capitalizeFirstLetter} from '../../utilities/string.utils';

export const parseOmdbMovieSearchData = (data) => {
    console.log('Parse data', data);
    if (data.Search) {
        return data.Search.slice(0, 5).map((result) => {
            return {
                category: capitalizeFirstLetter(result.Type),
                title: result.Title,
                shortLabel: result.Year
            };
        });
    }
    return [];
};