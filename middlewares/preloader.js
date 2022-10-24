const { getById } = require('../services/housingService');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        const housing = await getById(id);
        res.locals.housing = housing;

        next();
    };
}

module.exports = preload;