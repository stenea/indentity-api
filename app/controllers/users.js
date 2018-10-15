/**
 * Created by vladtomsa on 27/09/2018
 */
const jwt = require('jsonwebtoken');
const User = require('../database/models').User;
const { Base64: { encode } } = require('js-base64');
const {REGISTRATION_LINK_JWT_KEY} = require('../../config/constants');

const list = (params) => {
    return User
        .findAll({
            where: {...params},
            attributes: {exclude: ['password']}
        })
};

const create = ({username, email}) => {
    return User.create({username, email});
};

const update = (userInfo, id) => {
    return User.update(userInfo, {where: {id: id}, individualHooks: true});
};

const confirmUser = ({address, password, token}) => {
    return new Promise((resolve, reject) => {
        try {
            // Most frequently, if the token has expired JWT will throw an TokenExpiredError here
            const {username, email} = jwt.verify(token, REGISTRATION_LINK_JWT_KEY);

            const verifyUserParams = {
                email: encode(email),
                username: encode(username),
            };

            list(verifyUserParams)
                .then((userInfoList) => {
                    if (userInfoList && userInfoList.length) {
                        const userInfo = userInfoList[0];

                        if (userInfo.isActive || userInfo.password) {
                            return reject({message: 'User already confirmed'});
                        }

                        const toUpdate = {
                            password,
                            isActive: true,
                            personaAddress: address,
                        };

                        update(toUpdate, userInfo.dataValues.id)
                            .then(() => resolve({
                                username
                            }))
                            .catch(reject)
                    }
                    else {
                        return reject({message: 'Invalid user'});
                    }
                })
                .catch((error) => reject(error));
        }
        catch (error) {
            return reject(error);
        }
    })
};

const getNewUsers = () => {
    const params = {
        isRegEmailSent: null,
    };

    return list(params);
};

module.exports = {
    confirmUser,
    create,
    getNewUsers,
    list,
    update,
};