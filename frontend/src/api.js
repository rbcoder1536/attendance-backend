import { getToken } from "./auth";
const API = "http://localhost:4000";

const authFetch = (url, options = {}) =>
  fetch(API + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  }).then(r => r.json());

export const login = data =>
  fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const getStats = () => authFetch("/stats");
export const checkIn = () => authFetch("/checkin", { method: "POST" });
export const getAttendance = () => authFetch("/attendance");
export const getLeaves = () => authFetch("/leaves");
export const addLeave = data =>
  authFetch("/leave", { method: "POST", body: JSON.stringify(data) });
