import { Schema, model, Mongoose } from 'mongoose';

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        default: '',
        required: true,
    } ,
    url: {
        type: String,
        default: '',
    },
    active: {
        type: Boolean,
        default: false,
    },
    role: String,
    mail: String,
    phoneNumber: String,
    location: String,
    joinDate: Date,
  });

export default model('User', UserSchema);
