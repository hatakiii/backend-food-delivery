import { NextResponse } from "next/server";
import { categories } from "../data";

export async function POST(req: Request) {
  const body = await req.json();
  const { category } = body;

  const response = NextResponse.json({ data: categories }, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*"); // Or '*' for all origins
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}
