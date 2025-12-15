import React from "react";

interface Props {
  onCancel: () => void;
  onSave: () => void;
}

const DeleteAllModalContent: React.FC<Props> = ({  onCancel, onSave }) => {

  return (
    <div className="text-white row">
      

      <label className="w-100 text-start">Title</label>
      <div className="p-5 w-100">Are you sure you want to delete all the tasks? <span className="text-danger"> this action will delete all existing tasks</span> </div>
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

export default DeleteAllModalContent;
