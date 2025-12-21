import React from "react";

interface Props {
  onCancel: () => void;
  onSave: () => void;
  colors: String[];
}

const ModalContent: React.FC<Props> = ({colors, onCancel, onSave}) => {
  return (
    <div className="text-white row">
      <div className="d-flex justify-content-end">
        <span className="pt-2 me-2">Status</span>
        <select
          className="bg-dark text-white  p-2 form-control w-25"
          style={{
            backgroundColor: "white",
            color: "black",
            fontSize: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
       <div className="m-1 mt-2" 
          style={{ backgroundColor: colors[0] as string, width: "22px", height: "22px", borderRadius: "5%" }}
          onClick={()=> {

          }}
        >
       </div>
      </div>
      <div className="w-100">
          <div className="d-flex gap-2">
            {colors.map((col, index) => (
              <div
                key={index}
                className="rounded"
                style={{
                  backgroundColor: col as string,
                  width: "22px",
                  height: "22px",
                  borderRadius: "5%",
                  cursor: "pointer",
                  border: "2px solid #000",
                }}
              />
            ))}
          </div>
      </div>
      <label className="w-100 text-start">Title</label>
      <input className="p-2 rounded w-full text-black my-2" />

      <label className="w-100 text-start">Description</label>
      <textarea className="p-3 rounded w-full h-40 text-black my-2" />

      <div className="d-flex justify-content-end w-100 mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded mr-3 bg-red-400 text-white bg-danger mx-2">
          Cancel
        </button>

        <button
          onClick={onSave}
          className="px-6 py-2 rounded bg-white text-blue-900">
          Save
        </button>
      </div>
      
    </div>
  );
};

export default ModalContent;
