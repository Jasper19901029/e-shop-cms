import { NextRequest, NextResponse } from "next/server";
import { Text } from "./abc";

export async function GET(req: NextRequest) {
  return NextResponse.json("i am get");
}

export async function POST(req: NextRequest, res: NextResponse) {
  const str = Text("I love you");
  return NextResponse.json({ abc: "i am post", str: str });
}
