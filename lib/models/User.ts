import mongoose, { Schema } from "mongoose";

type UserSchemaType = {
  email: string;
  password: string;
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

export const User =
  mongoose.models.User || mongoose.model<UserSchemaType>("User", UserSchema);
