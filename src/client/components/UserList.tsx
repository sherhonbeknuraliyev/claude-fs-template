import type { User } from "@shared/schemas/user.schema.js";

interface UserListProps {
  users: Array<
    Omit<User, "createdAt" | "updatedAt"> & {
      createdAt?: string;
      updatedAt?: string;
    }
  >;
}

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return <p>No users found. Create one above!</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td style={tdStyle}>{user.name}</td>
            <td style={tdStyle}>{user.email}</td>
            <td style={tdStyle}>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = {
  textAlign: "left" as const,
  padding: "0.5rem",
  borderBottom: "2px solid #eee",
};

const tdStyle = {
  padding: "0.5rem",
  borderBottom: "1px solid #eee",
};
