import Input from "./Input";

export default function MetricEditionCard({
  metric,
  index,
  editingIndex,
  editedMetrics,
  handleInputChange,
  handleEditClick,
  handleSaveClick,
  handleDeleteClick,
  handleCancelClick,
}) {
  if (!metric) {
    return <span>No metric info available</span>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 mx-auto p-8 border border-gray-300 md:w-2/3 lg:w-1/2">
      <div className="flex flex-col items-center md:flex-row md:gap-6">
        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <Input
            type="text"
            label="Date"
            styles={styles.inputs}
            value={new Date(metric.timestamp).toLocaleString()}
            disabled
          />
        </div>

        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <Input
            type="text"
            label="Name"
            styles={styles.inputs}
            value={editingIndex === index ? editedMetrics.name : metric.name}
            onChange={(e) => handleInputChange(e, "name")}
            disabled={editingIndex !== index}
          />
        </div>

        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <Input
            type="number"
            label="Value"
            styles={styles.inputs}
            value={editingIndex === index ? editedMetrics.value : metric.value}
            onChange={(e) => handleInputChange(e, "value")}
            disabled={editingIndex !== index}
          />
        </div>
      </div>

      <div className="flex justify-around mt-4">
        {editingIndex === index ? (
          <>
            <button
              onClick={() => handleSaveClick(metric._id)}
              className="text-green-700 hover:text-green-400 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                />
              </svg>
              Save
            </button>

            <button
              onClick={() => handleCancelClick(metric._id)}
              className="text-brand-primary hover:text-brand-primary/70 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleEditClick(index)}
              className="text-blue-700 hover:text-blue-400 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit
            </button>

            <button
              onClick={() => handleDeleteClick(metric._id)}
              className="text-brand-primary hover:text-brand-primary/70 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  inputs: {
    container: "py-1 w-full",
    label: "font-semibold text-gray-600",
    input: "border rounded-full h-10 pl-2 text-center w-full",
  },
};
