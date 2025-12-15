import Sidebar from "./Sidebar";

import {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Configuration from "./Configuration";
function App() {
  const [page, setPage] = useState<String>("dashboard");
  return (
    <>
      {/* <div
        className="d-flex"
        style={{backgroundColor: "#FF8040", width: "100vw", height: "100vh"}}>
        <Sidebar /> 
        <Dashboard />
      </div> */}

      <div
        className="d-flex"
        style={{
          backgroundColor: "#FF8040",
          width: "100vw",
          height: "100vh",
        }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/configuration" element={<Configuration />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
