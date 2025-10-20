import { createFood, getAllFoods } from "@/lib/services/food-service";
import { loginUser } from "@/lib/services/user-service";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const dataJson = request.json();
  const { email, password } = await dataJson;
  const result = await loginUser(email, password);
  if (result) {
    return NextResponse.json({
      success: true,
      message: "Login Successful",
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Login Failed",
    });
  }
}

export const GET = async () => {
  const foods = await getAllFoods();
  return NextResponse.json({ data: foods }, { status: 200 });
};
