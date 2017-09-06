"use strict";

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const config = require('../config/main');


//JWT generation
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 604800 // seconds
    });
}

//Shorten user info to just required info
function setUserInfo(req) {
    return {
        _id: req._id,
        firstname: req.profile.firstname,
        lastname: req.profile.lastname,
        email: req.email,
        role: req.role
    };
}

//ROUTE FOR LOGIN
exports.login = function(req, res, next) {

    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });

}

//ROUTE FOR REGISTRATION
exports.register = function(req, res, next) {

    //error checking
    const email = req.body.email;
    const firstname =  req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;

    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.' });
    }
    if (!firstname) {
        return res.status(422).send({ error: 'You must enter your first name.' });
    }
    if (!lastname) {
        return res.status(422).send({ error: 'You must enter your last name.' });
    }
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({ email: email}, function(err, exisitingUser) {
        if (err) { return next(err); }

        //check for exisiting user
        if(exisitingUser) {
            return res.status(422).send( {error: 'An account with that email already exists.'});
        }

        //create new user
        let user = new User({
            email: email,
            password: password,
            profile: {
                firstname: firstname,
                lastname: lastname
            }
        });

        user.save(function(err, user) {
            if (err) { return next(err); }

            let userInfo = setUserInfo(user);

            //send JWT token
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
        });
    });

}

exports.roleAuthentication = function(role) {

    return function(req, res, next) {
        const user = req.user;

        User.findById(user._id, function(err, userFound) {
            if (err) {
                res.status(422).json({ error: 'User not found.' });
                return next(err);
            }

            //checking role
            if(userFound.role == role) {
                return next();
            }

            //not authorized
            res.status(401).json({ error: 'You are not authorized to view this content.' });
            return next('Unauthorized');
        });
    }

}

exports.forgotPassword = function(req, res, next) {
    const email = req.body.email;

    User.findOne({ email }, (err, user) => {

        if (err || !user) {
            res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
            return next(err);
        }

        //else user is found
        crypto.randomBytes(48, (err, buffer) => {
            const resetToken = buffer.toString('hex');
            if (err) { return next(err); }

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(err => {
                if (err) { return next(err) };

                const message = {
                    subject: 'Reset Password -- UniChat',
                    text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://'}${req.headers.host}/reset-password/${resetToken}\n\n` +
                        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
                };

                //TODO impliement mailing api

                return res.status(200).json({message: message});

            });
        });
    });
}

exports.verifyToken = function(req, res, next) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if (!user) {
            res.status(422).json({ error: 'Your reset password link has expired. Please request a new link.'});
        }
        if (err) {
            res.status(422).json({ error: 'Your request could not be processed.' });
        }

        user.password = req.body.password;
        user.resetPasswordExpires = undefined;
        user.resetPasswordToken = undefined;

        user.save(err => {
            if (err) { return next(err) };

            const message = {
                subject: 'Password Changed',
                text: 'You are receiving this email because you changed your password. \n\n' +
                    'If you did not request this change, please contact us immediately.'
            };

            //TODO use email api

            return res.status(200).json({ message: message });
        });
    });
}
