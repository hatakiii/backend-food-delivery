import {
  createCategory,
  getAllCategories,
  deleteCategoryById,
} from "@/lib/services/category-service";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message || "Failed to delete category" }),
      { status: 400 }
    );
  }
}
