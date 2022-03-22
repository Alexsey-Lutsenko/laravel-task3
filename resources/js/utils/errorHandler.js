module.exports = (e) => {

    const errors = e.response.data ? e.response.data : e.message ? e.message : e;

    if (e.response.status === 500) {
        return { message: e.request.statusText + ', status ' + e.response.status };
    }

    if (errors.errors) {
        for (let i in errors.errors) {
            errors.errors[i] = errors.errors[i].join(" | ");
        }
        return errors;
    } else if(errors.message) {
        return { message: errors }
    }
};
