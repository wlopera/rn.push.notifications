import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Button,
  Image,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

import IconButton from "../components/UI/IconButton";
import { storage } from "../firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const AddBirthdayScreen = ({ route, navigation }) => {
  const [inputs, setInputs] = useState({
    firstname: {
      value: "",
      isValid: true,
    },
    lastname: {
      value: "",
      isValid: true,
    },
  });
  const currentDate = {
    year: 2023,
    month: 10,
    day: 7,
  };

  const [date, setDate] = useState(
    new Date(currentDate.year, currentDate.month, currentDate.day)
  );
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Permiso requerido para lanzar imagenes
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    delete result.cancelled;
    console.log("Resultado 1=> ", result.uri, );
    console.log("Resultado 2=> ", result.assets[0].uri );

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Validar si tiene id
  const editedId = route.params?.id;

  // Convertir un valor en boolean (si existe true/false sino false)
  const isEditing = !!editedId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Actualizar Cumpleaños" : "Agregar Cumpleaños",
    });
  }, []);

  const onChangeDateHandler = (e, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };

  const onShowHandler = (e) => {
    setShow(true);
  };

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue.toUpperCase(), isValid: true },
      };
    });
  };

  const submit = () => {
    const data = {
      firstname: inputs.firstname.value,
      lastname: inputs.lastname.value,
      date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      image: image,
    };

    console.log("Payload de datos =>", data);
  };

  const uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf("/") + 1);
    var storageRef = ref(storage, filename);

    // Create file metadata to update
    const metadata = {
      contentType: 'image/jpeg',
    };

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob, metadata).then((snapshot) => {
      console.log("Archivo enviado a firebase!", snapshot);
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nombre</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => inputChangedHandler("firstname", value)}
        value={inputs.firstname.value}
      />
      <Text style={styles.text}>Apellido</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => inputChangedHandler("lastname", value)}
        value={inputs.lastname.value}
      />
      <Text style={styles.text}>Fecha de cumpleaños</Text>
      <View style={styles.date}>
        <View style={styles.textDate}>
          <Pressable onPress={onShowHandler}>
            <Text style={{ marginTop: 10 }}>{date.toLocaleDateString()}</Text>
          </Pressable>
        </View>
        <View style={styles.button}>
          <IconButton
            icon="calendar"
            size={30}
            color="#760ce1"
            onPress={onShowHandler}
          />
        </View>
      </View>
      <View style={styles.viewImage}>
        <Button title="Agregar Imagen" onPress={pickImage} />
      </View>
      <View style={styles.imageRoot}>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
      </View>
      <View style={styles.viewImage}>
        <Button title="Enviar Imagen" onPress={uploadImage} />
      </View>
      {show && (
        <DateTimePicker
          mode="date"
          display="calendar"
          value={date}
          onChange={onChangeDateHandler}
          format={"YYYY-MM-DD"}
          displayFormat={"DD MMM YYYY"}
        />
      )}
      <View style={styles.submitButton}>
        <Button title="Enviar" onPress={submit} />
      </View>
    </View>
  );
};

export default AddBirthdayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "left",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    marginLeft: 10,
    marginTop: 20,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: "80%",
  },
  textDate: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: "80%",
    color: "black",
    marginLeft: 10,
    marginTop: 20,
  },
  button: {
    paddingEnd: 30,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageRoot: { alignItems: "center", paddingTop: 30 },
  imageContainer: {
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  image: { width: 150, height: 150 },
  viewImage: { width: "83%", paddingLeft: 10, paddingTop: 20 },
  submitButton: { width: "95%", paddingLeft: 10, paddingTop: 20 },
});
