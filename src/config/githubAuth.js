const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const UserModel = require("../models/user.model");

passport.use(
    new GitHubStrategy(
        {
        clientID: YOUR_GITHUB_CLIENT_ID,
        clientSecret: YOUR_GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserModel.findOne({ githubId: profile.id });

            if (user) {
            return done(null, user);
            } else {

            const newUser = await UserModel.create({
                githubId: profile.id,
                username: profile.username,
                displayName: profile.displayName,

            });
            return done(null, newUser);
            }
        } catch (error) {
            return done(error);
        }
        }
    )
);

module.exports = passport;