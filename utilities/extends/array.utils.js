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

export const sortGems = (gems) => {
    if (gems) {
        return gems.sort((a, b) => {
            return new Date(b.experienced_at || b.created_at).getTime() - new Date(a.experienced_at || a.created_at).getTime();
        });
    }
    return [];
};

export const onlyGemForThisGroup = (experience, group) => {
    return experience.user.group === group;
};

export const onlyGemForThisCategory = (experience, category) => {
    if (category && category !== 'All') {
        if(experience.item.category.toLowerCase() === category.toLowerCase() ||
            experience.item.category.toLowerCase() === category.toLowerCase().substring(0, category.length - 1)) {
            return true;
        }
        return false;
    }
    return true;
};

export const onlySaveForThisGroup = (experience, group) => {
    return experience.user.group === group;
};

export const onlyGemForThisUser = (experience, userId) => {
    return experience.user.id === userId;
};

export const onlySaveForThisUser = (experience, userId) => {
    return experience.user.id === userId;
};
