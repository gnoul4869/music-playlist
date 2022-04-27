const generateParams = (title, id) => {
    return title.replace(/\s/g, '-') + '.' + id;
};

export default generateParams;
