import connectDB from "../mongodb";
import { User } from "../models/User";

export const createUser = async (email: string, password: string) => {
  await connectDB();
  const newUser = new User({ email, password });
  await newUser.save();
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  await connectDB();
  const user = await User.findOne({ email, password });
  if (user) {
    return true;
  } else {
    return false;
  }
};
