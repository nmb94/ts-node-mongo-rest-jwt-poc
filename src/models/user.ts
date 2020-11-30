import { Document, Schema, Model, model } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
}

export const userSchema: Schema = new Schema({
    username: String,
    password: String,
});

export const User: Model<IUser> = model<IUser>(`User`, userSchema);