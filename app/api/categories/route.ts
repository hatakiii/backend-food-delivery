import {
  createCategory,
  getAllCategories,
  deleteCategoryById,
} from "@/lib/services/category-service";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Category } from "@/lib/models/Category";

export async function GET() {
  const categories = await getAllCategories();
  return new NextResponse(JSON.stringify({ data: categories }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await createCategory(body.newCategory);
  return new NextResponse(JSON.stringify({ message: "Category created" }), {
    status: 200,
  });
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Category ID required" }),
        { status: 400 }
      );
    }

    await deleteCategoryById(id);
    return new NextResponse(JSON.stringify({ message: "Category deleted" }), {
      status: 200,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete category";
    return new NextResponse(
      JSON.stringify({ error: message || "Failed to delete category" }),
      { status: 400 }
    );
  }
}
// app/api/categories/route.ts

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { id, newName } = await req.json();

    if (!id || !newName)
      return NextResponse.json(
        { error: "Missing id or new name" },
        { status: 400 }
      );

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name: newName },
      { new: true }
    );

    if (!updatedCategory)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );

    return NextResponse.json({ data: updatedCategory });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}
