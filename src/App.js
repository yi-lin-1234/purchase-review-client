import { Route, Routes } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import All from "./views/All";
import Create from "./views/Create";
import Search from "./views/Search";
import Category from "./views/Category";
import Evaluation from "./views/Evaluation";
import BarChart from "./views/BarChart";

import Detail from "./views/Detail";
import Edit from "./views/Edit";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="all" element={<All />} />
        <Route path="create" element={<Create />} />
        <Route path="search" element={<Search />} />
        <Route path="category" element={<Category />} />
        <Route path="evaluation" element={<Evaluation />} />
        <Route path="chart" element={<BarChart />} />

        <Route path="detail/:id" element={<Detail />} />
        <Route path="edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default App;
