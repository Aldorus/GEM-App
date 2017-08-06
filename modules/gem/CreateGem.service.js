import {gemFetch} from '../../utilities/authFetch.service';

export default function CreateGem(gem) {
    // TODO replace the key
    return gemFetch(`https://www.omdbapi.com/?s=${value}&apikey=c6c0355`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(gem)
    });
}