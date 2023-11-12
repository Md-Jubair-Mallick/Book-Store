import mongoose, { Schema, Mongoose } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    profilePic: {type: String, required: true},
})

export default mongoose.model('User', userSchema)