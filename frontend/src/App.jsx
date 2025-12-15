import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getToken } from "./auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [auth, setAuth] = useState(!!getToken());

  if (!auth) return <Login onLogin={() => setAuth(true)} />;

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar onLogout={() => { localStorage.clear(); setAuth(false); }} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leaves" element={<Leaves />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
