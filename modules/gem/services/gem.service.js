import {gemFetch} from '../../../utilities/authFetch.service';
import {Config} from '../../../constants/Config';

export const createGem = (gem) => {
    // TODO replace the key
    return gemFetch(`https://rousselguillaume.fr/?s=${gem}&apikey=c6c0355`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(gem)
    });
};

export const getAllGems = () => {
    console.log('getAllGems');
    return gemFetch(`${Config.WS_ROOT}items`).then((parsedResponse) => {
        console.log('response', parsedResponse);
        return parsedResponse.items;
    });
};