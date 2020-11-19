import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";

import { User } from "../models/user";
import { JWT_SECRET } from "../constants";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy(
    // { usernameField: `username` },
    (username: string, password: string, done) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        User.find({ username: username.trim() }, (err: Error, user: any) => {
            if (err) { return done(err); }
            if (!user) {
                return done(undefined, false, { message: `Invalid username or password.` });
            }
            user.comparePassword(password).then((isMatch: boolean) => {
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, { message: `Invalid username or password.` });
            }).catch((err2: Error) => done(err2));
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
                return done(undefined, user , jwtToken);
            }
            return done(undefined, false);
        })
));