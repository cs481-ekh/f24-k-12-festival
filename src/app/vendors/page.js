import { neon } from '@neondatabase/serverless';

async function getData() {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT * FROM vendors`;
  console.log(response)
  return response;
}

export default async function Vendors() {
  const data = await getData();
  return (
    <div class="min-w-full overflow-hidden overflow-x-auto p-5">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="text-sm text-gray-700 bg-gray-50 border">
          <tr>
            <th class="px-6 py-3 border">Building</th>
            <th class="px-6 py-3 border">Room</th>
            <th class="px-6 py-3 border">Vendor Name</th>
            <th class="px-6 py-3 border">Vendor Description</th>
            <th class="px-6 py-3 border">Age Range</th>
            <th class="px-6 py-3 border">Starting Time</th>
          </tr>
        </thead>
        {data.map((row) => (
          <tr key={row.id} class="border-l border-r text-center">
            <td class="px-6 py-3 border-b">{row.building}</td>
            <td class="px-6 py-3 border-b">{row.room}</td>
            <td class="px-6 py-3 border-b">{row.vendor_name}</td>
            <td class="px-6 py-3 border-b">{row.vendor_description}</td>
            <td class="px-6 py-3 border-b">{row.age_range}</td>
            <td class="px-6 py-3 border-b">{row.starting_time}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}