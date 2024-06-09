import Home from "./components/Home";
import Coachs from "./components/Coachs";
import Members from "./components/Members";
import Layout from "./components/Layout";
import Trainers from "./components/Trainers";
import Request from "./components/Request";


import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Coachs" element={<Coachs />} />
          <Route path="Members" element={<Members />} />
          <Route path="Trainers" element={<Trainers />} />
          <Route path="Request" element={<Request />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
