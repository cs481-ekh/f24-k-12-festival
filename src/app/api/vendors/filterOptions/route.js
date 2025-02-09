import { openDB } from "../../../../lib/db";
import { NextResponse } from "next/server";
import { connection } from 'next/server'

export async function Page() {
  await connection();

  const db = await openDB();

  const ageOptions = await db.all('SELECT DISTINCT age_range FROM vendors');
  const buildingOptions = await db.all('SELECT DISTINCT building FROM vendors');
  const floorOptions = await db.all('SELECT DISTINCT floor FROM vendors WHERE floor <> ""');
  const roomOptions = await db.all('SELECT DISTINCT room FROM vendors WHERE room <> ""');
  const vendorNameOptions = await db.all('SELECT DISTINCT vendor_name FROM vendors');

  return NextResponse.json({
    ageOptions,
    buildingOptions,
    floorOptions,
    roomOptions,
    vendorNameOptions,
  });
}
