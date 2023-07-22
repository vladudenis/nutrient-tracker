import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { textInput: ingr } = await request.json();

  if (!ingr) return;

  const res = await fetch(
    "https://api.edamam.com/api/nutrition-data?" +
      new URLSearchParams({
        app_id: process.env.EDAMAM_APP_ID!,
        app_key: process.env.EDAMAM_APP_KEY!,
        ingr,
      }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  return NextResponse.json({ body: data });
}
