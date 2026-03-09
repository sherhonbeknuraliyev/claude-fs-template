import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { UsersScreen } from "../screens/UsersScreen";

export type RootStackParamList = {
  Home: undefined;
  Users: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
