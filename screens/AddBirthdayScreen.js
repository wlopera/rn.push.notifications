import { View, StyleSheet, Button, Alert } from "react-native";
import { useLayoutEffect, useState } from "react";

import InputText from "../components/UI/InputText";
import InputDate from "../components/UI/InputDate";
import InputImage from "../components/UI/InputImage";

import { getDownloadImage } from "../utils/utilsImage";
import { addRecordDB } from "../utils/utilsDB";

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
  const [image, setImage] = useState(null);

  // Validar si tiene id
  const editedId = route.params?.id;

  // Convertir un valor en boolean (si existe true/false sino false)
  const isEditing = !!editedId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Actualizar Cumpleaños" : "Agregar Cumpleaños",
    });
  }, []);

  useLayoutEffect(() => {
    const getImage = async () => {
      const response = await getDownloadImage(
        "/JUAN_ARANGO_1699569932641.png"
      );
      console.log(42537, response)
      if (response.code === 200) {
        setImage(response.data);
      } else {
        Alert.alert("Error", response.message);
      }
    };

    getImage();
  }, []);

  const inputChangedHandler = (enteredValue, inputIdentifier) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue.toUpperCase(), isValid: true },
      };
    });
  };

  const submit = async () => {
    const data = {
      firstname: inputs.firstname.value,
      lastname: inputs.lastname.value,
      date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
    };

    addRecordDB(data, image);
  };

  return (
    <View style={styles.container}>
      <InputText
        label="Nombre"
        name="firstname"
        input={inputs.firstname.value}
        setInput={inputChangedHandler}
      />

      <InputText
        label="Nombre"
        name="lastname"
        input={inputs.lastname.value}
        setInput={inputChangedHandler}
      />
      <InputDate
        label="Fecha de cumpleaños"
        input={date}
        setInput={setDate}
        mode="date"
        display="calendar"
      />

      <InputImage
        input={image}
        setInput={setImage}
        initImage={require("../assets/images/camara.jpeg")}
      />

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
    backgroundColor: "#48548B",
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  viewImage: { width: "83%", paddingLeft: 10, paddingTop: 20 },
  submitButton: { width: "95%", paddingLeft: 10, paddingTop: 20 },
});
