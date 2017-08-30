/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

export const onlyGem = (experience) => {
    return experience.fullfil === undefined || experience.fullfil === true;
};

export const onlySaved = (experience) => {
    return !experience.fullfil === false;
};

export const onlyGemForThisGroup = (experience, group) => {
    return onlyGem(experience, group) && experience.user.group === group;
};

export const onlySaveForThisGroup = (experience, group) => {
    return onlySaved(experience, group) && experience.user.group === group;
};

export const onlyGemForThisUser = (experience, userId) => {
    return onlyGem(experience) && experience.user.id === userId;
};

export const onlySaveForThisUser = (experience, userId) => {
    return onlySaved(experience) && experience.user.id === userId;
};
