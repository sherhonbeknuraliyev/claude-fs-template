import { useState } from "react";
import { trpc } from "../utils/trpc.js";

interface CreateUserFormProps {
  onSuccess?: () => void;
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      setName("");
      setEmail("");
      setPassword("");
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser.mutate({ name, email, password, role: "user" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "2rem",
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ padding: "0.5rem" }}
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: "0.5rem" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
        style={{ padding: "0.5rem" }}
      />
      <button
        type="submit"
        disabled={createUser.isPending}
        style={{ padding: "0.5rem 1rem" }}
      >
        {createUser.isPending ? "Creating..." : "Add User"}
      </button>
      {createUser.error && (
        <p style={{ color: "red", width: "100%" }}>
          Error: {createUser.error.message}
        </p>
      )}
    </form>
  );
}
