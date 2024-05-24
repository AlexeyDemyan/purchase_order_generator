import { Schema, Document, model } from "mongoose";

export interface UserDocument extends Document {}

const usersSchema = new Schema({
  name: String,
});

export const UserModel = model<UserDocument>("User", usersSchema);
