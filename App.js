import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PushNotificationScreen from "./screens/PushNotificationScreen";
import BirthdayScreen from "./screens/BirthdayScreen";
import AddBirthdayScreen from "./screens/AddBirthdayScreen";

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
          name="AddBirthday"
          component={AddBirthdayScreen}
          //options={{ title: "Agregar Cumpleaños" }}
        ></Stack.Screen>
        <Stack.Screen
          name="PushNotification"
          component={PushNotificationScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
