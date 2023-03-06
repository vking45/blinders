import { Outlet } from "react-router-dom";
import Navbar from "./views/components/Navbar";
import Sidebar from "./views/components/Sidebar";

import './styles/styles.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
