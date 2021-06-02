import express, { Router, Request, Response, NextFunction } from 'express';
import AuthController from './auth.controller';

interface IAuthResponse {
    success: boolean;
    token: string | null;
    message: string;
}

export const AuthRouter: Router = Router();

AuthRouter.use(express.json());
AuthRouter.use(express.urlencoded({extended: false}));

AuthRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const {username, email, password} = req.body;
    let jsonResponse: IAuthResponse;
    try {
        const token: string = await AuthController.signUp(username, email, password);
        jsonResponse = {
            success: true,
            token: token,
            message: 'You were successfully signed up'
        }
        res
            .status(201)
            .json(jsonResponse);
    } catch(error) {
        jsonResponse = {
            success: false,
            token: null,
            message: error.message
        };
        res
            .status(400)
            .json(jsonResponse);
    }
});

AuthRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let jsonResponse: IAuthResponse;
    try {
        const token: string = await AuthController.login(email, password);
        jsonResponse = {
            success: true,
            token,
            message: 'You were successfully logged in'
        }
        res
            .status(200)
            .json(jsonResponse);
    } catch(error) {
        jsonResponse = {
            success: false,
            token: null,
            message: error.message
        };
        res
            .status(400)
            .json(jsonResponse);
    }
});

