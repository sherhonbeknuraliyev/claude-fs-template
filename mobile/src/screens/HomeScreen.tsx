import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fullstack Template</Text>
      <Text style={styles.subtitle}>React Native + tRPC + MongoDB</Text>

      <View style={styles.features}>
        <Text style={styles.feature}>End-to-end type safety with tRPC</Text>
        <Text style={styles.feature}>Shared Zod schemas with backend</Text>
        <Text style={styles.feature}>React Query for data fetching</Text>
        <Text style={styles.feature}>Same API as the web app</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Users")}
      >
        <Text style={styles.buttonText}>View Users</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  features: {
    marginBottom: 32,
    gap: 8,
  },
  feature: {
    fontSize: 14,
    color: "#444",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
