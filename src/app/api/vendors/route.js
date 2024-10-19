import { openDB } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await openDB();
  const vendors = await db.all('SELECT * FROM vendors');
  return NextResponse.json(vendors);
}

export async function POST(req) {

}