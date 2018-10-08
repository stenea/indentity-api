/**
 * Created by vladtomsa on 08/10/2018
 */
const {ValidationError} = require('express-json-validator-middleware');

const reqBodyValidator = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(400);

        res.json({
            statusText: 'Bad Request',
            validations: err.validationErrors,
        });
    }
    else {
        next(err);
    }
};

module.exports = reqBodyValidator;