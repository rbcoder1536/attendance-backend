import { useEffect, useState } from "react";
import { getStats, checkIn } from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="loader-wrap">
        <div className="loader"></div>
        <p>Loading dashboard…</p>
      </div>
    );
  }

  const handleCheckIn = async () => {
    setCheckingIn(true);
    await checkIn();
    const s = await getStats();
    setStats(s);
    setCheckingIn(false);
  };

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          <span>Present Days</span>
          <b>{stats.present}</b>
        </div>
        <div className="card">
          <span>Total Leaves</span>
          <b>{stats.leaves}</b>
        </div>
        <div className="card">
          <span>Pending Requests</span>
          <b>{stats.pending}</b>
        </div>
      </div>

      <button className="primary" onClick={handleCheckIn} disabled={checkingIn}>
        {checkingIn ? "Checking In…" : "Check In"}
      </button>
    </div>
  );
}
