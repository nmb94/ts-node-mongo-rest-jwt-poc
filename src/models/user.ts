import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    username: string;
    password: string;
}

export const userSchema: Schema = new Schema({
    username: String,
    password: String,
});

userSchema.pre<IUser>(`save`, function save(next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(this.password, salt, (err2: Error, hash) => {
            if (err2) { return next(err2); }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
            if (err) {reject(err);}
            else {resolve(isMatch);}
        });
    });
};

export const User: Model<IUser> = model<IUser>(`User`, userSchema);