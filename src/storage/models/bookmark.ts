const BookmarkSchema = {
    name: 'Bookmark',
    properties: {
        make: 'string',
        model: 'string',
        miles: { type: 'int', default: 0 },
    },
};
