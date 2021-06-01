import { IUser, User } from './auth.model';
import { sign, verify } from 'jsonwebtoken';

interface Payload {
    _id: string;
}

class AuthController {
    private _secretKey: string = "12345-67890-09876-54321";
    private _loginError: string = 'Email or password is wrong!';

    async signUp(username: string, email: string, password: string): Promise<string> {
        const user: IUser = new User({
            username,
            email, 
            password
        });

        user.password = await user.encryptPassword(password);

        const savedUser = await user.save();

        const token: string = sign(
            { _id: user._id }, 
            this._secretKey,
            { expiresIn: 3600 }
        ); 

        return token;
    }

    async login(email: string, password: string): Promise<string> {
        const user = await User.findOne({ email });

        if( !user ) {
            throw new Error(this._loginError);
        }

        const token: string = sign(
            {_id: user._id }, 
            this._secretKey, 
            {expiresIn: 3600}
        );

        return token;
    }

    verifyToken(token: string): string{
        let payload: Payload;

        try {
            payload = verify(token.substring(7), this._secretKey) as Payload;
        } catch(error) {
            throw new Error("The provided token is invalid!");
        }

        return payload._id;
    }
}

export default new AuthController();
