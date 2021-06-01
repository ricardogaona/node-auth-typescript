import express, { Application, NextFunction, Request, Response } from 'express';
import { AuthRouter } from './auth/auth.route';
import AuthController from './auth/auth.controller';
import './database';

const app: Application = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.use('/auth', AuthRouter);

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: 'OK',
        message: 'Bienvenidos al servidor'
    });
});

app.get('/protected', (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.header('Authorization') as string;
    req.user = AuthController.verifyToken(token);
    next();
}, (req: Request, res: Response) => {
    res.json({
        status: 'OK',
        message: 'Este mensaje lo pueden ver solamente los usuarios autenticados'
    });
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

