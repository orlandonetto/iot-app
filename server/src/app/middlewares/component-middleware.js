module.exports = {
    identifier(req, res, next) {
        const {id} = req.params;

        if (!id)
            return res.status(400).json('id not informed.');

        req.id = id;

        next();
    },
    value(req, res, next) {
        const {value} = req.query;

        if (!value)
            return res.status(400).json('value not informed.');

        next();
    },
};
