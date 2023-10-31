import { Text, View, Button, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

/**
 * expo-notificationsLa biblioteca se utiliza para solicitar el permiso de un usuario y recuperar el archivo ExpoPushToken.
 * No es compatible con un emulador de Android ni con un simulador de iOS.
 * expo-devicese utiliza para comprobar si la aplicación se está ejecutando en un dispositivo físico.
 * expo-constantsse utiliza para obtener el projectIdvalor de la configuración de la aplicación
 */

/**
 * Cuando se recibe una notificación mientras la aplicación se está ejecutando, al usar esta función puede configurar una
 * devolución de llamada que decidirá si la notificación debe mostrarse al usuario o no.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Puede utilizar esta funcion o Expo's Push Notification Tool from: https://expo.dev/notifications (enviar notificaciones)
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Push Notification",
    body: "Notificación automática enviada desde mi Redmi 9A",
    data: { someData: "Cualquier data adicional" },
  };

  console.log("Push notification enviada:", message);

  //   curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  //   "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  //   "title":"hello",
  //   "body": "world"
  // }'
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    /**
     * Asigna la configuración del canal a un canal de un nombre específico (creándolo si es necesario).
     * Este método le permite asignar un canal de notificación determinado a un grupo de canales de notificación.
     */
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    // Comprueba los permisos del usuario para acceder al dispositivo
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      // Pide al usuario que otorgue permisos para acceder al dispositivo
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert(
        "No se pudo obtener el token de inserción para la notificación automáticas!"
      );
      return;
    }
    /**
     * Devuelve un token de Expo que se puede utilizar para enviar una notificación automática al dispositivo
     * mediante el servicio de notificaciones automáticas de Expo
     */
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log("Token del dispositivo:", token);
  } else {
    alert(
      "Debe utilizar un dispositivo físico para las notificaciones automáticas"
    );
  }

  return token?.data;
}

export default function PushNotificationScreen() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones Automáticas</Text>
      <View style={styles.view}>
        <Text style={styles.text}>Token: {expoPushToken}</Text>
        <Text style={styles.text}>
          Title: {notification && notification.request.content.title}
        </Text>
        <Text style={styles.text}>
          Body: {notification && notification.request.content.body}
        </Text>
        <Text style={styles.text}>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
        <View style={styles.button}>
          <Button
            color="#2b00ff"
            title="Enviar Notificación"
            onPress={async () => {
              await sendPushNotification(expoPushToken);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#8f8b8b",
    padding: 10,
    marginTop: 60,
    margin: 10,
  },
  view: {flex: 1, marginTop: 40},
  title: {
    marginTop: 20,
    margin:10,
    textAlign: "center",
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    borderWidth: 2,
    backgroundColor: "#e3f7de",
  },
  text: {
    padding: 5,
    margin: 10,
    color: "black",
    fontSize: 20,
    textAlign: "left",
    borderWidth: 2,
    backgroundColor: "#e7f3cc",
  },
  button: {
    marginHorizontal: 60,
    marginVertical: 4,
    borderWidth: 2,
    borderRadius: 6,
    marginTop:20
  },
});
