import React from "react";

interface Props {
  data: { status: "To Do" | "In Progress" | "Done"; title: string; description: string };
  onCancel: () => void;
  onSave: (data: { status: "To Do" | "In Progress" | "Done"; title: string; description: string }) => void;
}

const UpdateModalContent: React.FC<Props> = ({ data, onCancel, onSave }) => {
  const [status, setStatus] = React.useState<"To Do" | "In Progress" | "Done">(data.status);
  const [title, setTitle] = React.useState(data.title);
  const [description, setDescription] = React.useState(data.description);

  return (
    <div className="text-white row">
      
      {/* Status */}
      <div className="d-flex justify-content-end">
        <span className="pt-2 me-2">Status</span>
        <select
          className="bg-dark text-white p-2 form-control w-25"
          style={{
            backgroundColor: "white",
            color: "black",
            fontSize: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <label className="w-100 text-start">Title</label>
      <input
        className="p-2 rounded w-full text-black my-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="w-100 text-start">Description</label>
      <textarea
        className="p-3 rounded w-full h-40 text-black my-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="d-flex justify-content-end w-100 mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded mr-3 bg-danger text-white mx-2"
        >
          Cancel
        </button>

        <button
          onClick={() =>
            onSave({
              status,
              title,
              description,
            })
          }
          className="px-6 py-2 rounded bg-white text-blue-900"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateModalContent;
