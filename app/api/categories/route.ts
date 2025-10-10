import {
  createCategory,
  getAllCategories,
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
  console.log(body);
  await createCategory(body.name);
  return new NextResponse(JSON.stringify({ message: "Category created" }), {
    status: 200,
  });
}
