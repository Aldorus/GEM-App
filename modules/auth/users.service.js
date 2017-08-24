import {Config} from '../../constants/Config';
import {gemFetch} from '../../utilities/authFetch.service';
import {copyObject} from '../../utilities/extends/object.utils';

export const getAllUsers = () => {
    return gemFetch(`${Config.WS_ROOT}users`).then((parsedResponse) => {
        return parsedResponse.users;
    });
};

export const getAllFriends = (userGroup) => {
    return gemFetch(`${Config.WS_ROOT}users`).then((parsedResponse) => {
        return parsedResponse.users.filter((user) => {
            return user.group === userGroup;
        });
    });
};

export const authenticate = (user) => {
    const formdata = new FormData();
    formdata.append('email', user.email);
    return gemFetch(`${Config.WS_ROOT}authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formdata
    }).then((parsedResponse) => {
        const userToReturn = copyObject(user);
        userToReturn.accessToken = parsedResponse.auth_token;
        return userToReturn;
    });
};