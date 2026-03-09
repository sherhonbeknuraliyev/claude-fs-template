import { trpc } from "../utils/trpc.js";
import { UserList } from "../components/UserList.js";
import { CreateUserForm } from "../components/CreateUserForm.js";

export function UsersPage() {
  const usersQuery = trpc.user.list.useQuery({ page: 1, limit: 20 });

  return (
    <div>
      <h1>Users</h1>
      <CreateUserForm onSuccess={() => usersQuery.refetch()} />
      {usersQuery.isLoading && <p>Loading...</p>}
      {usersQuery.error && (
        <p style={{ color: "red" }}>Error: {usersQuery.error.message}</p>
      )}
      {usersQuery.data && <UserList users={usersQuery.data.items} />}
    </div>
  );
}
