import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

const InputDate = ({ label, input, setInput, mode, display }) => {
  const [show, setShow] = useState(false);

  const onChangeDateHandler = (e, selectedDate) => {
    setShow(false);
    setInput(selectedDate);
  };

  const onShowHandler = () => {
    setShow(true);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dateContainer}>
        <View style={styles.textDate}>
          <Pressable onPress={onShowHandler}>
            <Text style={styles.text}>{input.toLocaleDateString()}</Text>
          </Pressable>
        </View>
      </View>
      {show && (
        <DateTimePicker
          mode={mode}
          display={display}
          value={input}
          onChange={onChangeDateHandler}
        />
      )}
    </View>
  );
};

export default InputDate;

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
    marginTop: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textDate: {
    height: 40,
    borderWidth: 1,
    width: "95%",
    color: "black",
    backgroundColor: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  text: { marginTop: 10 },
});
