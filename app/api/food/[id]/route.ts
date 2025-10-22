import { NextRequest, NextResponse } from "next/server";
import { Food } from "@/lib/models/Food";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { FoodType } from "@/lib/utils/types";

type FoodUpdateData = {
  name?: string;
  ingredients?: string;
  price?: number;
  categoryId?: string;
  imageUrl?: string;
};

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const ingredients = formData.get("ingredients") as string;
    const price = formData.get("price") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File | null;

    const updateData: FoodUpdateData = {
      name,
      ingredients,
      price: Number(price),
      categoryId,
    };

    if (image) {
      const uploadedUrl = await uploadImageToCloudinary(image);
      updateData.imageUrl = uploadedUrl;
    }

    const updated = await Food.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: "Failed to update food" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await Food.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete food" },
      { status: 500 }
    );
  }
}
