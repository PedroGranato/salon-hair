import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
    username: string;
    birthdate: Date;
    telephone: string;
    email: string;
    password: string;
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

});

const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;
