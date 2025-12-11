import { useState } from "react";


// Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Optional: Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);

  return (
    <>
      <div
        className="d-none d-lg-block text-white vh-100 my-2 ms-2 p-3"
        style={{
          width: collapsed ? "70px" : "240px",
          maxHeight: "98vh",
          backgroundColor: "#001BB7",
          position: "relative",
          borderRadius: "0 20px 20px 0",
          transition: "0.3s width",
          overflow: "visible",
        }}
      >
        <button
          onClick={toggleCollapse}
          className="btn p-2 rounded-circle shadow"
          style={{
            background: "#2d4fff",
            position: "absolute",
            top: "20px",
            right: collapsed ? "-20px" : "-20px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            transition: "0.3s"
          }}
        >
          <i
            className={`bi ${
              collapsed ? "bi-arrow-right-short" : "bi-arrow-left-short"
            } text-white fs-4`}
          ></i>
        </button>

        <h4
          className="mb-4"
          style={{
            opacity: collapsed ? 0 : 1,
            transition: "0.2s",
            whiteSpace: "nowrap"
          }}
        >
          My Sidebar
        </h4>

        <ul className="nav flex-column gap-3">
          <li className="nav-item d-flex align-items-center gap-2">
            <i className="bi bi-house fs-4"></i>
            {!collapsed && <span>Dashboard</span>}
          </li>

    

          <li className="nav-item d-flex align-items-center gap-2">
            <i className="bi bi-gear fs-4"></i>
            {!collapsed && <span>Configurations</span>}
          </li>
        </ul>
      </div>

      {/* --- MOBILE OFFCANVAS TETAP --- */}
      <button
        className="btn btn-dark d-lg-none m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
      >
        <i className="bi bi-list fs-3"></i>
      </button>

      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        id="sidebarOffcanvas"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">My Sidebar</h5>
          <button
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="nav flex-column gap-2">
            <li><i className="bi bi-house"></i> Home</li>
            <li><i className="bi bi-grid"></i> Dashboard</li>
            <li><i className="bi bi-gear"></i> Settings</li>
          </ul>
        </div>
      </div>
    </>
  );
}
