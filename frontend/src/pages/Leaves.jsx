import { useEffect, useState } from "react";
import { getLeaves, addLeave } from "../api";

export default function Leaves() {
  const [leaves, setLeaves] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    getLeaves().then(setLeaves);
  }, []);

  if (!leaves) {
    return (
      <div className="loader-wrap">
        <div className="loader"></div>
        <p>Loading leaves…</p>
      </div>
    );
  }

  const submit = async () => {
    await addLeave(form);
    setLeaves(await getLeaves());
  };

  return (
    <div className="page">
      <h1>Leaves</h1>

      <div style={{ marginBottom: 20 }}>
        <input type="date" onChange={e => setForm({ ...form, start: e.target.value })} />
        <input type="date" onChange={e => setForm({ ...form, end: e.target.value })} />
        <input placeholder="Reason" onChange={e => setForm({ ...form, reason: e.target.value })} />
        <button className="primary" onClick={submit}>Apply</button>
      </div>

      <ul>
        {leaves.map(l => (
          <li key={l.id}>
            {l.start} → {l.end} ({l.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
