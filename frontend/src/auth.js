export const getToken = () => localStorage.getItem("token");
export const setToken = t => localStorage.setItem("token", t);
export const logout = () => localStorage.removeItem("token");
