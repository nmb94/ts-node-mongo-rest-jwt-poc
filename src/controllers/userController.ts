import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";

import "../auth/passportHandler";
import { User } from "../models/user";
import { JWT_SECRET } from "../constants";
import { handlePromise } from "../utils";

export class UserController {
    public registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [err, resp] = await handlePromise(User.create({
                username: req.body.username,
                password: hashedPassword,
            }));
            if (err) {
                console.log(`Error occurred while registering a user`);
                console.log(err);
                res.sendStatus(500);
            }
            else {
                const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRET);
                res.status(200).send({ token: token });
            }
        } catch (error) {
            console.log(`An error occurred while registering a user:`);
            console.log(error);
            res.sendStatus(500);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public authenticateUser = (req: Request, res: Response, next: NextFunction): any => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            passport.authenticate(`local`, (err, user, info) => {
                if (err) return next(err);
                if (!user) {
                    return res.status(401).json({ status: `error`, code: `unauthorized` });
                }
                res.status(200).send({ token: jwt.sign({ username: user.username }, JWT_SECRET) });
            });
        } catch (error) {
            console.log(`An error occurred while authenticating a user:`);
            console.log(error);
            res.sendStatus(500);
        }
    }
}