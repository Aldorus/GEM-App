import {AsyncStorage} from 'react-native';

export const gemFetch = (url, options) => {
    return AsyncStorage.getItem('current_user').then((user) => {
        if(!options.headers) {
            options.headers = {};
        }
        options.headers.Authorization = `Bearer ${user.accessToken}`;
        return fetch(url, options).then((response) => response.json());
    });
};