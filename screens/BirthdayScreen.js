import BirtdayList from "../components/BirthdayList/BirtdayList";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";

const BirthdayScreen = ({ navigation }) => {
  const addBirthdayHandler = () => {
    console.log("Agregar Cumpleaños");
    navigation.navigate("AddBirthday", {});
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="add"
          size={24}
          color="black"
          onPress={addBirthdayHandler}
        />
      ),
    });
  }, []);

  return <BirtdayList />;
};

export default BirthdayScreen;
