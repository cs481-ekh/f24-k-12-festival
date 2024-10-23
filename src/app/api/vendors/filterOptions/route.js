import { openDB } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await openDB();

  const ageOptions = await db.all('SELECT DISTINCT age_range FROM vendors');
  const buildingOptions = await db.all('SELECT DISTINCT building FROM vendors');
  const roomOptions = await db.all('SELECT DISTINCT room FROM vendors WHERE room <> ""');
  const vendorNameOptions = await db.all('SELECT DISTINCT vendor_name FROM vendors');

  return NextResponse.json({
    ageOptions,
    buildingOptions,
    roomOptions,
    vendorNameOptions,
  });
}