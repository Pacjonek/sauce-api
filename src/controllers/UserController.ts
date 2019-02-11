import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import PassportConfig from '../config/PassportConfig';

export default class UserController {

    public addNewUser(req: Request, res: Response) {
        new User(req.body).save((err, user) => {
            if (err) {
                res.status(400);
                res.send(err);
            }
            res.json(user);
        });
    }
    public getUsers(req: Request, res: Response) {
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    public getUserWithId(req: Request, res: Response) {
        User.findById(req.params.UserId, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    public updateUser(req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.UserId }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    public deleteUser(req: Request, res: Response) {
        User.remove({ _id: req.params.UserId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted User!'});
        });
    }

    public postLogin(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('login', { session : false }, async (err, user) => {
            try {
                if (err) {
                    return next(new Error('An Error occured!'));
                } else if (!user) {
                    res.status(401);
                    res.json({ message: 'Invalid pair of username and/or password'});
                    return;
                }
                const passportConfig = new PassportConfig();
                const userBody = { _id : user._id, username: user.username, role : user.role };
                const token = jwt.sign({ user : userBody }, passportConfig.secretOrKey);
                return res.json({ username: user.username, role: user.role, token });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    }

    public isAuthorized(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', { session : false })(req, res, next);
    }

    // TODO: User authentication / Role checking
}
