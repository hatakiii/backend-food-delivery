import { loginUser, getAllUsers } from "@/lib/services/user-service";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await loginUser(email, password);

  if (user) {
    return NextResponse.json({
      success: true,
      message: "Login Successful",
      data: { _id: user._id, email: user.email, role: user.role },
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Login Failed",
    });
  }
}

export const GET = async () => {
  const users = await getAllUsers();
  return NextResponse.json({ data: users }, { status: 200 });
};
