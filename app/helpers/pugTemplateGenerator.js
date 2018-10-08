/**
 * Created by vladtomsa on 01/10/2018
 */
const path = require('path');
const pug = require('pug');

const getTemplateByFileName = (fileName, options) => {
    const templatePath = path.resolve('app', 'resources', 'emailTemplates', fileName);
    const compile = pug.compileFile(templatePath);

    return compile(options);
};

module.exports = getTemplateByFileName;