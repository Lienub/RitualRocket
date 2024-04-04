import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { Appbar } from "react-native-paper";
import { getUserInfo } from "../../services/users";
import styles from "./styles";

export default function StatisticsScreen({ navigation }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action
          icon="account-circle"
          onPress={() => console.log("Profile")}
          color="#fff"
          size={40}
          style={{ marginLeft: "auto" }}
        />
        <Appbar.Content
          title={""}
          color="#fff"
        />
      </Appbar.Header>
      <View style={styles.block}>
        <Text style={styles.title}>
          Progressions /{"\n"}
          Statistiques
        </Text>
      </View>
    </View>
  );
}
