import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={styles.app}>
      <Sidebar />
      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#020617",
    color: "#e5e7eb",
  },
  main: {
    flex: 1,
    padding: "32px",
  },
};
