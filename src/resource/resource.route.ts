import express, { Request, Response, Router } from 'express';
import verifyToken from '../middlewares/verifyToken';

export const ResourceRouter: Router = Router();

ResourceRouter.use(express.json());
ResourceRouter.use(express.urlencoded({extended: false}));

ResourceRouter.get('/', verifyToken, (req: Request, res: Response) => {
    res.json({
        status: 'OK',
        message: 'Este mensaje lo pueden ver solamente los usuarios autenticados'
    });
});
