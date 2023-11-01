import { View, Text, TextInput, StyleSheet } from "react-native";
import { useLayoutEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

// TODO - cambiar: 
// react-native-modal-datetime-picker
// https://www.npmjs.com/package/react-native-modal-datetime-picker
import IconButton from "../components/UI/IconButton";

const AddBirthdayScreen = ({ route, navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
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
      console.log(111111)
      setDate(selectedDate);
      setShow(false);    
      e.preventDefault()
  };

  const onShowHandler = (e) => {
    console.log(22222)
    setShow(true);
    e.preventDefault()
  };

  const onChangeTextHandler = () => {};

  console.log(123, show)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nombre</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeTextHandler}
        value={firstname}
      />
      <Text style={styles.text}>Apellido</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeTextHandler}
        value={lastname}
      />
      <Text style={styles.text}>Fecha de cumpleaños</Text>
      <View style={styles.date}>
        <TextInput style={styles.textInput}>
          {date.toLocaleDateString()}
        </TextInput>
        <View style={styles.button}>
          <IconButton
            icon="calendar"
            size={40}
            color="#58565a"
            onPress={onShowHandler}            
          />
        </View>
      </View>
      {show && (
        <DateTimePicker
          mode="date"
          display="calendar"
          value={date}
          onChange={onChangeDateHandler}
        />
      )}
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
  button: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
