export const copyObject = (object) => {
    return Object.assign({}, object);
};

export const copyArray = (array) => {
    return array.slice(0);
};
