const bcrypt = require('bcrypt');
const models = require('../models');
const LocalStrategy = require('passport-local').Strategy
module.exports = function (passport) {

    function findUser(email, callback) {
        models.users.findOne({ where: { email: email } }).then(async (result) => {
            callback(null, result);
        }).catch(function (err) {
            callback(err, null);
        });
    }

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        models.users.findById(id).then(async (result) => {
            done(null, result);
        }).catch(function (err) {
            done(err, null);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        (email, password, done) => {
            findUser(email, (err, user) => {
                if (err) {
                    return done(err)
                }
                // usuário inexistente
                if (!user) { return done(null, false) }

                // comparando as senhas
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err) { return done(err) }
                    if (!isValid) { return done(null, false) }
                    return done(null, user)
                })
            })
        }
    ))

}