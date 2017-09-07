import {capitalizeFirstLetter} from '../../../utilities/extends/string.utils';

export const parseOmdbMovieSearchData = (data) => {
    if (data.Search) {
        return data.Search.slice(0, 5).map((result) => {
            return {
                key: `movie:${result.imdbID}`,
                category: capitalizeFirstLetter(result.Type),
                unformatedCategory: result.Type,
                title: result.Title,
                shortLabel: result.Year,
                image: result.Poster
            };
        });
    }
    return [];
};
