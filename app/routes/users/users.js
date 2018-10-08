/**
 * Created by vladtomsa on 27/09/2018
 */
'use strict';
const { Base64: { decode } } = require('js-base64');
const express = require('express');
const usersController = require('../../controllers').userController;
const validate = require('../../helpers/requestValidator');
const validationSchema = require('./validation');

const router = express.Router();
const path = "/users";

router
    .route('/')
        // .get((req, res) => {
        //     usersController.list()
        //         .then(data => res.status(200).send(data))
        //         .catch(error => res.status(400).send(error));
        // })
        .post(validate({body: validationSchema.createUser}), (req, res) => {
            usersController.create(req.body)
                .then(data => res.status(200).send(data))
                .catch(error => res.status(400).send(error));
        });

router
    .route('/confirm')
        .put(validate({ body: validationSchema.confirmUser }), (req, res) => {
            usersController.confirmUser(req.body)
                .then(data => res.status(200).send(data))
                .catch(error => res.status(400).send(error));
        });

/**
 * We added a basic authorization check to the request.
 * This means that before the requests get's here, the user's credentials are checked.
 * If they are valid, the userInfo property is added to the request.
 * Otherwise, the request is rejected
 * */
router
    .route('/login')
    .get((req, res) => {
        const userInfo = req.userInfo;
        res
            .status(200)
            .send({
                ...userInfo,
                email: decode(userInfo.email),
                personaAddress: decode(userInfo.personaAddress),
                username: decode(userInfo.username),
            });
    });

module.exports = {
    router,
    path,
};