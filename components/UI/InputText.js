import { StyleSheet, Text, TextInput, View } from "react-native";

const InputText = ({ label, name, input, setInput }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        name={name}
        value={input}
        onChangeText={(value)=>setInput(value, name)}
      />
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
    marginTop: 10,
  },
  input: {
    height: 40,
    margin: 10,
    padding:10,
    backgroundColor: "#fff",
    color: "black",
    fontWeight: "bold",
    borderWidth: 1,  
  },
});
