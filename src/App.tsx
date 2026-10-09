import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Today } from "./pages/Today/Today";
import { Upcoming } from "./pages/Upcoming/Upcoming";
import { Tasks } from "./pages/Tasks/Tasks";
import { Completed } from "./pages/Completed/Completed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Today />} />
          <Route path="/proximas" element={<Upcoming />} />
          <Route path="/tarefas" element={<Tasks />} />
          <Route path="/concluidas" element={<Completed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;