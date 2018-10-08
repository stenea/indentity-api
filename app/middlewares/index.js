/**
 * Created by vladtomsa on 08/10/2018
 */
const authorizationMiddleware = require('./authorization');
const reqBodyValidatorMiddleware = require('./reqBodyValidator');

module.exports = {
    authorizationMiddleware,
    reqBodyValidatorMiddleware,
};