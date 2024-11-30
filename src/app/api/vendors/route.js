import { openDB } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await openDB();
  const vendors = await db.all('SELECT * FROM vendors');
  return NextResponse.json(vendors);
}

// Handle POST and bulkAdd
export async function POST(req) {
  const db = await openDB();
  const body = await req.json();

  // Ensure body.vendors is always an array
  const vendors = Array.isArray(body.vendors) ? body.vendors : [body.vendors];
  const added = [];
  const skipped = [];
  const errors = [];

  try {
    await Promise.all(
      vendors.map(async (vendor) => {
        try {
          // Check if an identical entry already exists
          const existing = await db.get(
            `SELECT * FROM vendors WHERE 
             vendor_name = ? AND 
             vendor_description = ? AND 
             building = ? AND 
             floor = ? AND 
             room = ? AND 
             age_range = ? AND 
             time_frame = ?`,
            [
              vendor.vendor_name,
              vendor.vendor_description,
              vendor.building,
              vendor.floor,
              vendor.room,
              vendor.age_range,
              vendor.time_frame,
            ]
          );

          if (existing) {
            skipped.push(vendor); // Record as a duplicate
          } else {
            // Insert new entry
            await db.run(
              `INSERT INTO vendors (vendor_name, vendor_description, building, floor, room, age_range, time_frame)
               VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [
                vendor.vendor_name,
                vendor.vendor_description,
                vendor.building,
                vendor.floor,
                vendor.room,
                vendor.age_range,
                vendor.time_frame,
              ]
            );
            added.push(vendor); // Record as successfully added
          }
        } catch (error) {
          errors.push({ vendor, error }); // Capture any other error
        }
      })
    );

    return NextResponse.json(
      {
        message: `${added.length} vendors added successfully.`,
        added,
        skipped,
        errors,
      },
      { status: errors.length > 0 ? 207 : 201 } // Use 207 for partial success
    );
  } catch (error) {
    console.error("Error adding vendors:", error);
    return NextResponse.json({ error: "Failed to add vendors" }, { status: 500 });
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
  const { id, vendor_name = '', vendor_description = '', building = '', floor = '', room = '', age_range = '', time_frame = ''} = await req.json();

  if (!id) {
    return NextResponse.json({ message: 'Vendor ID is required' }, { status: 400 });
  }

  try {
    // Update the vendor in the database, allowing empty fields
    await db.run(
      'UPDATE vendors SET vendor_name = ?, vendor_description = ?, building = ?, floor = ?, room = ?, age_range = ?, time_frame = ? WHERE id = ?',
      [vendor_name, vendor_description, building, floor, room, age_range, time_frame, id]
    );

    return NextResponse.json({ message: 'Vendor updated successfully' });
  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json({ message: 'Failed to update vendor' }, { status: 500 });
  }
}
