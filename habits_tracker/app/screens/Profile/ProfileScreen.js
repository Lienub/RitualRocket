import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getUserInfo, removeUserInfo } from "../../services/users";
import styles from "./styles";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchUserInfo();
    }
  }, [isFocused]);

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
            <Appbar.Action
                icon={() => <Ionicons name="close" size={30} color="#fff" />}
                onPress={() => navigation.goBack()}
            />
            <Appbar.Content title="profile" titleStyle={styles.title} />
            <Appbar.Action
                icon={() => <Ionicons name="pencil" size={30} color="#fff" />}
                onPress={() => navigation.navigate("ChangeInformations")}
            />
        </Appbar.Header>
        <ScrollView style={styles.container}>
            <Text style={styles.title}>
                {user.username}
            </Text>
            <Text style={styles.title}>
                {user.email}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    removeUserInfo();
                    navigation.navigate("Signin");
                }}>
                <Text style={{ color: "#fff" }}>Se déconnecter</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("ChangePassword");
                }}> 
                <Text style={{ color: "#fff" }}>Changer le mot de passe</Text>
            </TouchableOpacity>
        </ScrollView>  
    </View>
  );
}
