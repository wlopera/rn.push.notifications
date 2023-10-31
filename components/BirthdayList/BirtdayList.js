import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { BIRTHDAY } from "../../data/dummy-birthday";
import BirthdayItem from "./BirthdayItem";

const BirtdayList = () => {
  const [birthdayList, setBirthdayList] = useState([]);

  useEffect(() => {
    setBirthdayList(BIRTHDAY);
  }, [BIRTHDAY]);

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
