import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export const CustomBtn = ({ name, navigateTo, disabled }) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={navigateTo}
      disabled={disabled}
    >
      <Text style={styles.btntxt}>{name}</Text>
      <AntDesign
        name="arrowright"
        size={24}
        color="white"
        style={{ position: "relative", left: 35 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 300,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1FCC79",
    display: "flex",
    flexDirection: "row",
    // justifyContent: 'space-evenly',
    borderRadius: 10,
  },
  btntxt: {
    // paddingRight: 50,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
