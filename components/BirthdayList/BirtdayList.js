import { View, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import { BIRTHDAY } from "../../data/dummy-birthday";
import BirthdayItem from "./BirthdayItem";
import { getAllDB } from "../../utils/utilsDB";

const BirtdayList = () => {
  const [birthdayList, setBirthdayList] = useState([]);

  useEffect(() => {
    const getDataDB = async () => {
      //setBirthdayList(BIRTHDAY);
      const response = await getAllDB();
      if ((response.code = 200)) {
        if (response.data.length > 0) {
          setBirthdayList(response.data);
        } else {
          Alert.alert("Warning", response.message);
        }
      } else {
        Alert.alert("Error", response.message);
      }
    };
    getDataDB();
  }, []);

  return (
    <View style={styles.container}>
      {birthdayList.map((item) => (
        <BirthdayItem key={item.id} {...item} />
      ))}
    </View>
  );
};

export default BirtdayList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
