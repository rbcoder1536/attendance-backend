import { useEffect, useState } from "react";
import { getAttendance } from "../api";

export default function Attendance() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAttendance().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="loader-wrap">
        <div className="loader"></div>
        <p>Loading attendance…</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Attendance</h1>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(a => (
            <tr key={a.id}>
              <td>{a.date}</td>
              <td>{a.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
