import { NextRequest, NextResponse } from "next/server";
import {
  createCategory,
  getAllCategories,
} from "../../../../lib/services/category-service";

export async function GET() {
  let categories = await getAllCategories();
  const response = NextResponse.json({ data: categories }, { status: 200 });
  console.log("categories=====", categories, "=====categories");

  return response;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Received category:", body);
  await createCategory(body.name);

  return new NextResponse(JSON.stringify({ message: "Category created!" }), {
    status: 200,
  });
}
