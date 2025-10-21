import { createUser } from "@/lib/services/user-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const dataJson = await request.json();
  console.log(dataJson);
  const { email, password, role } = await dataJson;
  const result = await createUser(email, password, role);
  if (result) {
    return NextResponse.json({
      success: true,
      message: "User Created Successfully",
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "User Creation Failed",
    });
  }
}
