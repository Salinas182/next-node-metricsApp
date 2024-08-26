"use client";

export default function AverageDataTable({ averages }) {
  const tableHeaders = ['Date', 'Average Value', 'Metrics Count'];

  if (!averages.length) {
    return <span>No data available.</span>
  }

  return (
    <div className="overflow-x-auto rounded-sm mb-8">
      <table className="min-w-full bg-white">
        <thead className="bg-brand-primary/40">
          <tr>
            {tableHeaders.map((header) => (
              <th
                className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700"
                key={`header-${header}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {averages.map((avg, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className={styles.tableCells}>
                {avg._id
                  ? new Date(
                      Date.UTC(
                        avg._id.year,
                        avg._id.month - 1,
                        avg._id.day,
                        avg._id.hour || 0,
                        avg._id.minute || 0
                      )
                    ).toLocaleString()
                  : "No data"}
              </td>

              <td className={styles.tableCells}>
                {avg.averageValue.toFixed(2)}
              </td>

              <td className={styles.tableCells}>{avg.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableCells: "py-2 px-4 border-y border-gray-200 text-sm text-gray-700"
};
