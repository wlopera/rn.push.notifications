import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";

import {converDate, getAge} from '../../utils/utilities'

const BirthdayItem = ({ id, name, date, image }) => {
  const { width, height } = useWindowDimensions();
  // console.log("width, height", width, height)

  let textSize = 18;

  if (width < 380) {
    textSize = 12;
  }
  const imageStyle = {
    fontSize: textSize,
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={styles.imageContainer}
        >
          <Image style={styles.image} source={image} />
        </View>
        <View  style={styles.imagenContainer}>
          <Text style={[styles.textName,imageStyle]}>{name}</Text>
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
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: 'flex-start',
  },
  imageContainer:{
    borderWidth: 1,
    overflow: "hidden",
    borderRadius:50,
    width: 100, height: 100
  },
  imagenContainer:{marginHorizontal: 20, marginVertical:20},
  image: { width: 100, height: 100 },
  textName:{
    fontWeight: 'bold'
  }
});
