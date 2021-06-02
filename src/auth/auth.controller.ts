import { IUser, User } from './auth.model';
import { sign } from 'jsonwebtoken';

interface Payload {
    _id: string;
}

class AuthController {
    private _loginError: string = 'Email or password is wrong!';
    private _secretKey = process.env.SECRET_KEY || 'this-is-a-secret';

    async signUp(username: string, email: string, password: string): Promise<string> {
        const user: IUser = new User({
            username,
            email, 
            password
        });

        user.password = await user.encryptPassword(password);
        await user.save();

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

        const validPassword = await user.validatePassword(password);
        if ( !validPassword ) {
            throw new Error(this._loginError);
        }

        const token: string = sign(
            {_id: user._id }, 
            this._secretKey, 
            {expiresIn: 3600}
        );

        return token;
    }
}

export default new AuthController();
