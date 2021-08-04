import React from "react";
import { StyleSheet, View, Text,Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("screen");

const Alert = ({ type, title }) => {
  // Iconos
  // error --> error-outline #fdecea
  // warning --> warning #fff4e5
  // info --> info-outline #e8f4fd
  // success --> check-circle-outline #edf7ed
  let background = "";
  let icon = "";

  if (type === "error") {
    background = "#ffc2bd";
    icon = "times-circle";
  } else if (type === "warning") {
    background = "#fcf6bb";
    icon = "warning";
  } else if (type === "info") {
    background = "#d2eafc";
    icon = "info-circle";
  } else if (type === "success") {
    background = "#c7edc7";
    icon = "check-circle";
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Icon name={icon} style={styles.icon} />
      <View style={{width:width*0.7}}>
      <Text style={styles.txt}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    borderRadius:5,
    width:width*0.9
  },
  icon: {
    alignSelf:"center",
    fontSize:width*0.07,
    marginRight: 10,
    alignSelf:"center",
  },
  txt:{
    fontSize:width*0.04,
  },
});

export default Alert;
