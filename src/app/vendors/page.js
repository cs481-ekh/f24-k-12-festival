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
    <div className="min-w-full overflow-hidden overflow-x-auto p-5">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-sm text-gray-700 bg-gray-50 border">
          <tr>
            <th className="px-6 py-3 border">Building</th>
            <th className="px-6 py-3 border">Room</th>
            <th className="px-6 py-3 border">Vendor Name</th>
            <th className="px-6 py-3 border">Vendor Description</th>
            <th className="px-6 py-3 border">Age Range</th>
            <th className="px-6 py-3 border">Starting Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-l border-r text-center">
              <td className="px-6 py-3 border-b">{row.building}</td>
              <td className="px-6 py-3 border-b">{row.room}</td>
              <td className="px-6 py-3 border-b">{row.vendor_name}</td>
              <td className="px-6 py-3 border-b">{row.vendor_description}</td>
              <td className="px-6 py-3 border-b">{row.age_range}</td>
              <td className="px-6 py-3 border-b">{row.time_frame}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}