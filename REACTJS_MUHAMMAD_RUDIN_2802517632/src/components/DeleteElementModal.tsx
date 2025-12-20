import React from "react";
import type UpdateModalContent from "./UpdateTaskModal";

interface Props {
  onCancel: () => void;
  onSave: () => void;
  title: string;
}

const DeleteModalContent: React.FC<Props> = ({ title , onCancel, onSave }) => {

  return (
    <div className="text-white row">
      

      <label className="w-100 text-start">Title</label>
      <input
        className="p-2 rounded w-full text-black my-2"
        value={title}
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
            onSave()
          }
          className="px-6 py-2 rounded bg-white text-blue-900"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModalContent;
