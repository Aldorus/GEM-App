import {gemFetch} from '../../utilities/authFetch.service';
import {Config} from '../../constants/Config';

export const getAllCom = ((gem) => {
    console.log('getAllCom');
    return gemFetch(`${Config.WS_ROOT}comments?experience_id=${gem.id}`).then((parsedResponse) => {
        return parsedResponse.comments;
    });
});

export const createComments = (gem, comments) => {
    console.log('createComments');
    const itemFormData = new FormData();
    itemFormData.append('comment[experience_id]', gem.id);
    itemFormData.append('comment[message]', comments);
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: itemFormData
    };

    return gemFetch(`${Config.WS_ROOT}comments`, options).then((parsedResponse) => {
        return parsedResponse.comment;
    });
};
