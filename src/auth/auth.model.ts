import { Document, Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

/**
 * Creamos la interfaz que defina la estructura del Schema
 */
interface IUser extends Document {
    username: string;
    email: string;
    password: string;

    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

/**
 * Utilizando la interfaz creamos el Schema para nuestro modelo User
 */
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        min:4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

/**
 * Agregamos al schema el metodo encryptPassword() definido en la interfaz
 * IUser, para guardar el hash del password en lugar del texto plano
 */
userSchema.methods.encryptPassword = async ( password: string ) => {
    const salt = await bcryptjs.genSalt();
    return bcryptjs.hash(password, salt);
}

/**
 * Agregamos al schema el metodo validatePassword() definido en la interfaz
 * IUser, para comparar el password ingresado por el usuario durante el login
 * con el password cuyo hash ha sido previamente almacenado
 */
userSchema.methods.validatePassword = async function ( password: string ) {
    return await bcryptjs.compare(password, this.password);
}

const User = model<IUser>('User', userSchema);

export {
    IUser,
    User
};
