import { openDB } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await openDB();
  const vendors = await db.all('SELECT * FROM vendors');
  return NextResponse.json(vendors);
}

export async function POST(req) {
  // Placeholder if needed in the future
}

export async function PUT(req) {
  const db = await openDB();
  const { id, vendor_name = '', vendor_description = '', building = '', room = '' } = await req.json();

  if (!id) {
    return NextResponse.json({ message: 'Vendor ID is required' }, { status: 400 });
  }

  try {
    // Update the vendor in the database, allowing empty fields
    await db.run(
      'UPDATE vendors SET vendor_name = ?, vendor_description = ?, building = ?, room = ? WHERE id = ?',
      [vendor_name, vendor_description, building, room, id]
    );

    return NextResponse.json({ message: 'Vendor updated successfully' });
  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json({ message: 'Failed to update vendor' }, { status: 500 });
  }
}

