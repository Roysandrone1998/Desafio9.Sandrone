const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
        const user = await UserModel.findOne({ email: username });

        if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Contraseña incorrecta" });
        }
        } catch (error) {
        return done(error);
        }
    })
    );

    passport.serializeUser((user, done) => {
    done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;