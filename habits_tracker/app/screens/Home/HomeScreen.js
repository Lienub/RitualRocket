import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getUserInfo } from "../../services/users";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      {
        (user) ? <Text style={{marginTop: 100, fontSize: 30}}>Welcome {user.username}</Text> : <Text>Loading...</Text>
      }
    </View>
  );
}
