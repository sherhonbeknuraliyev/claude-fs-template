import { StatusBar } from "expo-status-bar";
import { Provider } from "./src/utils/Provider";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <Provider>
      <RootNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}
