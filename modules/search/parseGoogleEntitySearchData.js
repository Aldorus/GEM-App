import {capitalizeFirstLetter, replaceAll} from '../../utilities/string.utils';

const extractMainCategory = (itemElement) => {
    const typeList = itemElement.result['@type'];
    if(typeList.length <= 1) {
        return typeList.join('');
    }

    // TODO parse the case 'Harry' who render a category label 'MovieSerie'
    return capitalizeFirstLetter(replaceAll(typeList.filter((type) => {
        return type !== 'Thing';
    })[0], '_', ' '));
};

export const parseGoogleEntitySearchData = (data) => {
    if (data.itemListElement) {
        return data.itemListElement.map((itemElement) => {
            return {
                category: extractMainCategory(itemElement),
                title: itemElement.result.name,
                shortLabel: itemElement.result.description,
                image: itemElement.result.image.contentUrl
            };
        })
    }
    return [];
};
