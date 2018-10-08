/**
 * Created by vladtomsa on 27/09/2018
 */
const config = require('./index');

module.exports = {
    development: config.development.database,
    test: config.test.database,
    production: config.production.database,
};