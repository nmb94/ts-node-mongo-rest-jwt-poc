import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import bcrypt from "bcryptjs";

import { User } from "../models/user";
import { JWT_SECRET } from "../constants";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(`login`, new LocalStrategy(
    { usernameField: `username`, passwordField: `password` },
    (username: string, password: string, done) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        User.findOne({ username: username.trim() }, (err: Error, user: any) => {
            if (err) { return done(err); }
            if (!user) {
                return done(undefined, false, { message: `Invalid username or password.` });
            }
            bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => {
                if (err) {done(err);}
                if (isMatch) {
                    return done(undefined, user);
                }
                done(undefined, false, { message: `Invalid username or password.` });
            });
        })
));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    }, (jwtToken, done) =>
        User.findOne({ username: jwtToken.username }, (err, user) => {
            if (err) { return done(err, false); }
            if (user) {
                return done(undefined, user, jwtToken);
            }
            return done(undefined, false);
        })
));