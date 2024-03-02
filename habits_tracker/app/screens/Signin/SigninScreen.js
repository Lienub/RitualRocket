import React from "react";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { Text, View } from "react-native";

export default function SigninScreen() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <StatusBar style="auto" />
    </View>
  );
}
