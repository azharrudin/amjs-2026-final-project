import {useColors} from "./types/colors.context";

function Configuration() {
  const {colors, setColors } = useColors();
  return (
    <div
      className="py-2 mt-5 px-2 ps-3  "
      style={{marginLeft: "5px", width: "100%", height: "90%"}}>
      <div
        className="p-3"
        style={{
          backgroundColor: "#F5F1DC",
          borderRadius: "16px",
          maxWidth: "100%",
          width: "100%",
          height: "90%",
        }}>
        <div
          className="w-50 p-2 rounded-4 text-white"
          style={{backgroundColor: "#FF8040"}}>
          <h3> This is Configuration Page</h3>
        </div>
        <div className="p-3">Color List</div>
        <div
          className="w-75 p-3"
          style={{
            backgroundColor: "#FF8040",
            height: "75%",
            borderRadius: "16px",
          }}>
          <div className="row">
            {colors.map((col, index) => (
              <div
                key={index}
                className="col-2 d-flex flex-column align-items-center mb-3"
                style={{position: "relative"}}>
                <span
                  className="badge bg-danger position-absolute"
                  style={{
                    top: "-6px",
                    right: "6px",
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                  onClick={() =>
                    setColors((prev) => prev.filter((_, i) => i !== index))
                  }>
                  ✕
                </span>

                <div
                  className="rounded"
                  style={{
                    backgroundColor: col as string,
                    width: "80px",
                    height: "80px",
                    border: "2px solid #000",
                  }}
                />

                <span className="mt-2">{col}</span>
              </div>
            ))}
            <div className="col-2 d-flex flex-column align-items-center mb-3">
            <div
              className="rounded d-flex flex-column align-items-center justify-content-center"
              style={{
                backgroundColor: "#FFFFFF",
                width: "80px",
                height: "80px",
                border: "2px solid #000",
                
              }}
            >
                +
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuration;
