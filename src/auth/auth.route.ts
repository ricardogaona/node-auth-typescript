import express, { Router, Request, Response, NextFunction } from 'express';
import AuthController from './auth.controller';

export const AuthRouter: Router = Router();

AuthRouter.use(express.json());
AuthRouter.use(express.urlencoded({extended: false}));

AuthRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const {username, email, password} = req.body;

    const token: string = await AuthController.signUp(username, email, password);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        succes: true,
        token,
        message: 'You were successfully signed up'
    });
});

AuthRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const token: string = await AuthController.login(email, password);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        succes: true,
        token,
        message: 'You were successfully logged in'
    });
});

