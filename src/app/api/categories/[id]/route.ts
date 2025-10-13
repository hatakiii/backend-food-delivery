import { NextRequest, NextResponse } from "next/server";
import { deleteCategoryById } from "../../../../../lib/services/category-service";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  let categories = await deleteCategoryById(id);

  console.log("newCategories===", categories, "===newCategories");

  return NextResponse.json({ data: categories }, { status: 200 });
}
