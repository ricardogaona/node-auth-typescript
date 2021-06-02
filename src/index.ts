import express, { Application, NextFunction, Request, Response } from 'express';
import { AuthRouter } from './auth/auth.route';
import { ResourceRouter } from './resource/resource.route';
import morgan from 'morgan';

import './database';

const app: Application = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.use(morgan(':method :url :response-time :status'));
app.use('/auth', AuthRouter);
app.use('/resource', ResourceRouter);

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: 'OK',
        message: 'Bienvenidos al servidor'
    });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

