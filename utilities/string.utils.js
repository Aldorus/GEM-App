export const replaceAll = (string, search, replacement) => {
    return string.replace(new RegExp(search, 'g'), replacement);
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};