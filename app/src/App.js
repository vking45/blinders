import { Route, Routes } from "react-router-dom";
import SideBar from "./views/components/SideBar";

import './styles/styles.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SideBar />} />
    </Routes>
  );
}

export default App;
