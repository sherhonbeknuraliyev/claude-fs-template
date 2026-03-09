import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { trpc } from "../utils/trpc";
import { UserCard } from "../components/UserCard";

export function UsersScreen() {
  const usersQuery = trpc.user.list.useQuery({ page: 1, limit: 20 });

  if (usersQuery.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (usersQuery.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {usersQuery.error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={usersQuery.data?.items ?? []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <UserCard user={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No users found. Seed the database!</Text>
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
    gap: 12,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 32,
  },
});
