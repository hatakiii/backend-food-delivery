//user-service.ts
import connectDB from "../mongodb";
import { User } from "../models/User";

export const createUser = async (
  email: string,
  password: string,
  role: string
) => {
  await connectDB();
  const newUser = new User({ email, password, role });
  await newUser.save();
  return newUser;
};

// export const loginUser = async (email: string, password: string) => {
//   await connectDB();
//   const user = await User.findOne({ email, password });
//   if (user) {
//     return true;
//   } else {
//     return false;
//   }
// };

// loginUser in user-service.ts
export const loginUser = async (email: string, password: string) => {
  await connectDB();
  const user = await User.findOne({ email, password });
  if (!user) return null;
  return user; // return full user document
};

export const getAllUsers = async () => {
  await connectDB();
  const allUsers = await User.find({}, "email role createdAt"); // you can include/exclude fields
  return allUsers;
};
