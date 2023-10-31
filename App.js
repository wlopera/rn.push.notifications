import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PushNotificationScreen from "./screens/PushNotificationScreen";
import BirthdayScreen from "./screens/BirthdayScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Birthday"
          component={BirthdayScreen}
          options={{ title: "Cumpleaños" }}
        ></Stack.Screen>
        <Stack.Screen
          name="PushNotification"
          component={PushNotificationScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
