import {gemFetch} from '../../../utilities/authFetch.service';
import {Config} from '../../../constants/Config';

export const createGem = (gem) => {
    return gemFetch(`${Config.WS_ROOT}items`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(gem)
    });
};

const createItem = () => {

}

export const getAllGems = ((filter) => {
    console.log('getAllGems');
    return gemFetch(`${Config.WS_ROOT}experiences`).then((parsedResponse) => {
        console.log('response', parsedResponse);
        return parsedResponse.items;
    });
});

export const getYourSaves = ((filter) => {
    console.log('getYourSaves', filter);
    return gemFetch(`${Config.WS_ROOT}experiences`).then((parsedResponse) => {
        console.log('response', parsedResponse);
        return parsedResponse.items;
    });
});

export const getYourGems = ((filter) => {
    console.log('getYourGems');
    return gemFetch(`${Config.WS_ROOT}experiences`).then((parsedResponse) => {
        console.log('response', parsedResponse);
        return parsedResponse.items;
    });
});
