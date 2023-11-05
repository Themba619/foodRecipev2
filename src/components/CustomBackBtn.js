import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export const CustomBackBtn = ({ backNavigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <TouchableOpacity
          onPress={backNavigation}
          style={{
            justifyContent: "center",
            position: "absolute",
            right: 310,
            top: 0,
          }}
        >
          <AntDesign
            name="arrowleft"
            size={35}
            color="black"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#3E5481" }}>
          Check your email
        </Text>
      </View>
      <Text
        style={{
          color: "#9FA5C0",
          fontSize: 15,
          // backgroundColor: 'red',
          // width: '100%',
          // alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        We've sent the code to your email
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // backgroundColor: 'blue',
    justifyContent: "center",
    alignItems: "center",
  },
  topHalf: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 60,
  },
});
