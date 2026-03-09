import { View, Text, StyleSheet } from "react-native";

interface UserCardProps {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function UserCard({ user }: UserCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{user.name}</Text>
        <View style={[styles.badge, user.role === "admin" && styles.adminBadge]}>
          <Text style={styles.badgeText}>{user.role}</Text>
        </View>
      </View>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  badge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adminBadge: {
    backgroundColor: "#E3F2FD",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },
});
