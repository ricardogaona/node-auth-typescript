import mongoose, { ConnectOptions } from 'mongoose';

// Opciones para conectarse a la base de datos
const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect('mongodb://mongo/mydatabase', options)
    .then(db => console.log('DB is connected to: ', db.connection.host))
    .catch(error => console.log(error));