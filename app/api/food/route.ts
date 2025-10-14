import { createFood, getAllFoods } from "@/lib/services/food-service";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  // Extract food fields from formData
  const name = formData.get("name") as string;
  const ingredients = formData.get("ingredients") as string;
  const price = formData.get("price") as string;
  const categoryId = formData.get("categoryId") as string;
  const image = formData.get("image") as File;

  const uploadedUrl = await uploadImageToCloudinary(image);

  const result = await createFood(
    name,
    ingredients,
    Number(price),
    categoryId,
    uploadedUrl
  );

  if (result) {
    return NextResponse.json(
      { message: "Food item received successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Food Failed to create" },
      { status: 400 }
    );
  }
}

export const GET = async () => {
  const foods = await getAllFoods();
  console.log(foods);
  return NextResponse.json({ message: "Hello" }, { status: 200 });
};
