import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>HRFlow</h2>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/attendance">Attendance</NavLink>
      <NavLink to="/leaves">Leaves</NavLink>
    </aside>
  );
}
