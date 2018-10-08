'use strict';
const {Base64} = require('js-base64');
const encode = Base64.encode;

const encryptUserInfo = (userInfo) => {
    const encode = Base64.encode;
    const changed = userInfo._changed;

    if (changed.username) userInfo.username = encode(userInfo.username);

    if (changed.email) userInfo.email = encode(userInfo.email);

    if (changed.personaAddress) userInfo.personaAddress = encode(userInfo.personaAddress);

    if (changed.password) userInfo.password = encode(userInfo.password);

    return userInfo;
};

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Creating two objects with the same value will throw an error. The unique property can be either a
        // boolean, or a string. If you provide the same string for multiple columns, they will form a
        // composite unique key.
        username: {type: DataTypes.STRING, unique: 'compositeIdentityIndex'},
        email: {type: DataTypes.STRING, unique: 'compositeIdentityIndex'},
        personaAddress: DataTypes.STRING,
        password: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        isRegEmailSent: DataTypes.BOOLEAN
    }, {});

    User.associate = function (models) {
        // associations can be defined here
    };

    User.hook('beforeCreate', (user, options) => {
        console.log('before create');
        return encryptUserInfo(user);
    });

    User.hook('beforeUpdate', (user, options) => {
        console.log('before update');
        return encryptUserInfo(user);
    });

    User.sync()
        .then(() => console.log('Users table created'))
        .catch((error) => console.log('Error creating users table: ', error));

    return User;
};