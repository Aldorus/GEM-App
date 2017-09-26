import {AsyncStorage} from 'react-native';
import {copyObject} from './extends/object.utils';

export const gemFetch = (url, options = {}) => {
    return AsyncStorage.getItem('current_user').then((user) => {
        return JSON.parse(user);
    }).then((user) => {
        const optionsCopy = copyObject(options);
        if (!options.headers) {
            optionsCopy.headers = {};
        }
        if (user && user.accessToken) {
            optionsCopy.headers.Authorization = user.accessToken;
        }
        return fetch(url, optionsCopy).then((response, more) => {
            console.log('response', response, more);
            if (response.ok) {
                return response.json().then((parsed) => {
                    return parsed;
                }).catch((error) => {
                    console.log('error in catch', error);
                    return {result: true};
                });
            }

            throw new Error(JSON.stringify({response}));
        }).catch((error, mote) => {
            console.log('error', error, mote);
            // return {result: true};
        });
    });
};
