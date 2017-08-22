import {Config} from '../../constants/Config';
import {gemFetch} from '../../utilities/authFetch.service';

export const getAllUsers = () => {
    return gemFetch(`${Config.WS_ROOT}users`).then((parsedResponse) => {
        return parsedResponse.users;
    });
};

export const getAllFriends = (userGroup) => {
    return gemFetch(`${Config.WS_ROOT}users`).then((parsedResponse) => {
        return parsedResponse.users.filter((user)=> {
            return user.group === userGroup;
        });
    });
};