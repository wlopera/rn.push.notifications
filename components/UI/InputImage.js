import { Image, Pressable, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

const InputImage = ({ input, setInput, initImage }) => {
  const pickImage = async () => {
    // Permiso requerido para lanzar imagenes
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    delete result.cancelled;
    //console.log("Resultado => ", result);

    if (!result.canceled) {
      setInput(result.assets[0]?.uri);
    }
  };

  const imageContext = input ? (
    <Image source={{ uri: input }} style={styles.image} />
  ) : (
    <Image source={initImage} style={styles.image} />
  );

  return (
    <View style={styles.imageContainer}>
      <Pressable onPress={pickImage}>
        <View style={styles.imageContext}>{imageContext}</View>
      </Pressable>
    </View>
  );
};

export default InputImage;

const styles = StyleSheet.create({
  image: { width: 150, height: 150 },
  imageContainer: { alignItems: "center", paddingTop: 30 },
  imageContext: {
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
