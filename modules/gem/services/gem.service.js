import uuidv4 from 'uuid/v4';
import {gemFetch} from '../../../utilities/authFetch.service';
import {Config} from '../../../constants/Config';
import {copyObject} from '../../../utilities/extends/object.utils';

const createItem = (gem) => {
    const itemFormData = new FormData();
    itemFormData.append('item[date]', new Date());
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
        console.log('add picture');
        const file = {
            uri: gem.picture,
            name: `${uuidv4()}.jpg`,
            type: 'image/jpg'
        };

        // var reader  = new window.FileReader();
        experienceFormData.append('experience[picture]', file);
    }
    console.log('experience', experienceFormData);

    return gemFetch(`${Config.WS_ROOT}experiences`, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: experienceFormData
    }).then((experienceResponse) => {
        return experienceResponse.experience;
    });
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