import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    _id: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let payload: Payload;

    const secretKey: string = process.env.SECRET_KEY as string || 'this is a secret';
    const token: string = req.header('Authorization') as string;

    try {
        payload = verify(token.substring(7), secretKey) as Payload;
        req.user = payload._id;

        next();
    } catch(error) {
        res
            .status(401)
            .json({
                success: false,
                message: 'You are not authorized!'
            });
    }
}

export default verifyToken;