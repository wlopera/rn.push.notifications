import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

import { converDate, getAge } from "../../utils/utils";

const BirthdayItem = ({ id, firstname, lastname, date, image }) => {
  const { width, height } = useWindowDimensions();
  // console.log("width, height", width, height)

  let textSize = 16;

  if (width < 380) {
    textSize = 12;
  }
  const imageStyle = {
    fontSize: textSize,
  };

  const imageContext = image ? (
    <Image source={{ uri: image }} style={styles.image} />
  ) : (
    // <Image source={require("../../assets/images/camara.jpeg")} style={styles.image} />
    <Image style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>{imageContext}</View>
        <View style={styles.cardContainer}>
          <Text style={[styles.textName, imageStyle]}>{firstname} {lastname}</Text>
          <Text style={imageStyle}>Cumpleaños el {converDate(date)}</Text>
          <Text style={imageStyle}>{getAge(date)}</Text>
        </View>
      </View>
    </View>
  );
};

export default BirthdayItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DADADA",
    padding: 10,
    margin: 2,
    paddingTop: 5,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imageContainer: {
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 30,
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  cardContainer: { marginLeft: 20 },
  image: { width: 60, height: 80 },
  textName: {
    fontWeight: "bold",
  },
});
