import uuidv4 from 'uuid/v4';
import {gemFetch} from '../../../utilities/authFetch.service';
import {Config} from '../../../constants/Config';
import {copyObject} from '../../../utilities/extends/object.utils';

export const getAllItems = (() => {
    console.log('getAllItems');
    return gemFetch(`${Config.WS_ROOT}items`).then((parsedResponse) => {
        return parsedResponse.items;
    });
});

const createItem = (gem) => {
    const itemFormData = new FormData();
    itemFormData.append('item[name]', gem.title);
    itemFormData.append('item[name_identifier]', uuidv4());
    itemFormData.append('item[category]', gem.unformatedCategory);

    console.log('item', itemFormData);

    return gemFetch(`${Config.WS_ROOT}items`, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: itemFormData
    }).then((itemResponse) => {
        return itemResponse.item;
    });
};

const callTheApi = (experienceFormData) => {
    console.log('experience', experienceFormData);
    return gemFetch(`${Config.WS_ROOT}experiences`, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: experienceFormData
    }).then((experienceResponse) => {
        return experienceResponse.experience;
    });
};

const createExperience = (item, gem) => {
    const experienceFormData = new FormData();
    experienceFormData.append('experience[item_id]', item.id);
    if (gem.word) {
        experienceFormData.append('experience[reaction]', gem.word);
    }

    if (gem.description) {
        experienceFormData.append('experience[description]', gem.description);
    }

    if (gem.picture) {
        if (gem.picture.indexOf('http') === 0) {
            console.log('add external picture');
            experienceFormData.append('experience[remote_picture_url]', gem.picture);
        } else {
            console.log('add internal picture');
            const file = {
                uri: gem.picture,
                name: `${uuidv4()}.jpg`,
                type: 'image/jpg'
            };
            experienceFormData.append('experience[picture]', file);
        }
    }
    console.log('experience', experienceFormData);
    return callTheApi(experienceFormData);
};

export const createGem = (gem, user) => {
    return createItem(gem).then((responseCreateItem) => {
        return createExperience(responseCreateItem, gem).then((responseCreateExp) => {
            const response = copyObject(responseCreateExp);
            response.item = responseCreateItem;
            response.user = user;
            return response;
        });
    });
};

export const getAllGems = (() => {
    console.log('getAllGems');
    return gemFetch(`${Config.WS_ROOT}experiences`).then((parsedResponse) => {
        return parsedResponse.experiences;
    });
});

export const getAllSaved = (() => {
    console.log('getAllSaved');
    return gemFetch(`${Config.WS_ROOT}experiences?fulfilled=false`).then((parsedResponse) => {
        return parsedResponse.experiences;
    });
});

export const deleteGem = (gem) => {
    return gemFetch(`${Config.WS_ROOT}experiences/${gem.id}`, {
        method: 'DELETE'
    }).then(() => {
        return true;
    });
};