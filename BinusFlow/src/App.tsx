import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
function App() {
  return (
    <>
      <div
        className="d-flex"
        style={{backgroundColor: "#FF8040", width: "100vw", height: "100vh"}}>
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
}

export default App;
