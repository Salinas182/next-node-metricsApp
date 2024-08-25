"use client";

export default function AverageDataTable({ averages }) {
  if (!averages.length) {
    return <span>No data available.</span>
  }

  return (
    <div className="overflow-x-auto rounded-sm mb-8">
      <table className="min-w-full bg-white border border-brand-primary">
        <thead className="bg-brand-primary/40">
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
              Date
            </th>

            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
              Average Value
            </th>

            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
              Metrics count
            </th>
          </tr>
        </thead>

        <tbody>
          {averages.map((avg, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-t border-gray-200 text-sm text-gray-700">
                {avg._id
                  ? new Date(
                      avg._id.year,
                      avg._id.month - 1,
                      avg._id.day,
                      avg._id.hour || 0,
                      avg._id.minute || 0
                    ).toLocaleString()
                  : "No data"}
              </td>

              <td className="py-2 px-4 border-t border-gray-200 text-sm text-gray-700">
                {avg.averageValue.toFixed(2)}
              </td>

              <td className="py-2 px-4 border-t border-gray-200 text-sm text-gray-700">
                {avg.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
