import {Config} from '../../constants/Config';

export const getAllUsers = () => {
    return fetch(`${Config.WS_ROOT}users`).then((response) => {
        return response.json();
    }).then((parsedResponse) => {
        return parsedResponse.users;
    });
};
