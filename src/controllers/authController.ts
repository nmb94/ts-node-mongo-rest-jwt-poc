import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../auth/passportHandler";

export class AuthController {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public authenticateJWT = (req: Request, res: Response, next: NextFunction): any =>
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        passport.authenticate(`jwt`, (err, user, info) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ status: `error`, code: `unauthorized` });
            }
            if (!user) {
                return res.status(401).json({ status: `error`, code: `unauthorized` });
            }
            next();
        })(req, res, next);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public authorizeJWT = (req: Request, res: Response, next: NextFunction): any =>
        passport.authenticate(`jwt`, (err, user, jwtToken) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ status: `error`, code: `unauthorized` });
            }
            if (!user) {
                return res.status(401).json({ status: `error`, code: `unauthorized` });
            }
            const scope = req.baseUrl.split(`/`).slice(-1)[0];
            const authScope = jwtToken.scope;
            if (authScope && authScope.indexOf(scope) > -1) {
                return next();
            }
            res.status(401).json({ status: `error`, code: `unauthorized` });
        })(req, res, next);
}