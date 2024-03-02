import React from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { Text, View } from "react-native";

export default function Signin() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <StatusBar style="auto" />
    </View>
  );
}
