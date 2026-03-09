import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "1rem" }}>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          borderBottom: "1px solid #eee",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
