import {AsyncStorage} from 'react-native';
import {copyObject} from './extends/object.utils';

export const gemFetch = (url, options = {}) => {
    return AsyncStorage.getItem('current_user').then((user) => {
        return JSON.parse(user);
    }).then((user) => {
        console.log('Get user', user);
        const optionsCopy = copyObject(options);
        if (!options.headers) {
            optionsCopy.headers = {};
        }
        if (user && user.accessToken) {
            optionsCopy.headers.Authorization = user.accessToken;
        }
        return fetch(url, optionsCopy).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(JSON.stringify({response}));
        });
    });
};
