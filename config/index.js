/**
 * Created by vladtomsa on 27/09/2018
 */
const development = require('./config.development');
const production = require('./config.production');
const test = require('./config.test');
const constants = require('./constants');

const createConfig = (module) => ({ ...module, constants });

module.exports = {
  development: createConfig(development),
  production: createConfig(production),
  test: createConfig(test),
};