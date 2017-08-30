export const parseGoogleBookSearchData = (data) => {
    if (data.items) {
        // TODO Slice incorrect
        return data.items.slice(0, 5).map((item) => {
            return {
                key: `book:${item.id}`,
                category: 'Book',
                title: item.volumeInfo.title,
                shortLabel: item.volumeInfo.authors ? item.volumeInfo.authors.join(' - ') : '',
                image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : ''
            };
        });
    }
    return [];
};
