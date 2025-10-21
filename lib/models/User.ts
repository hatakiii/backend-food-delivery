import mongoose, { Schema } from "mongoose";

type UserSchemaType = {
  email: string;
  password: string;
};

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    address: { type: String },
    phoneNumber: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"] },
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models.User || mongoose.model<UserSchemaType>("User", UserSchema);
