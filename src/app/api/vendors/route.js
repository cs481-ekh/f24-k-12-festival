import { openDB } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await openDB();
  const vendors = await db.all('SELECT * FROM vendors');
  return NextResponse.json(vendors);
}

export async function POST(req) {
  const db = await openDB();
  const { vendor_name, vendor_description, building, room, age_range, time_frame } = await req.json();

  try {
    await db.run(
      'INSERT INTO vendors (vendor_name, vendor_description, building, room, age_range, time_frame) VALUES (?, ?, ?, ?, ?, ?)',
      [vendor_name, vendor_description, building, room, age_range, time_frame]
    );
    return NextResponse.json({ message: 'Vendor added successfully' });
  } catch (error) {
    console.error('Error adding vendor:', error);
    return NextResponse.json({ message: 'Failed to add vendor' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const db = await openDB();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: 'Vendor ID is required' }, { status: 400 });
  }

  try {
    await db.run('DELETE FROM vendors WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json({ message: 'Failed to delete vendor' }, { status: 500 });
  }
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

