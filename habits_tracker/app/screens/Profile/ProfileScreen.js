import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getUserInfo, removeUserInfo } from "../../services/users";
import { getTasksByUserId } from "../../services/habits";

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import styles from "./styles";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [csvData, setCsvData] = useState([]); 
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchUserInfo();
      fetchUserTasks(); // Fetch tasks whenever user info is fetched or screen is focused
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

  const fetchUserTasks = async () => {
    try {
      if (user.userId) {
        const userTasks = await getTasksByUserId(user.userId);
        setCsvData(userTasks);
      }
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  const exportCSV = async () => {
    try {
      const headers = Object.keys(csvData[0]).join(',') + '\n';
  
      const csvContent = headers + csvData.map(row => Object.values(row).join(',')).join('\n');
  
      const filePath = `${FileSystem.documentDirectory}user_tasks.csv`;

      await FileSystem.writeAsStringAsync(filePath, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
  
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        await Sharing.shareAsync(filePath);
      } else {
        console.error('Plateforme non supportée pour le partage de fichier.');
      }
    } catch (error) {
      console.error('Erreur lors de la création ou du partage du fichier CSV:', error);
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
        <Text style={styles.title}>{user.username}</Text>
        <Text style={styles.title}>{user.email}</Text>
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
        <TouchableOpacity
          style={styles.button}
          onPress={exportCSV}> 
          <Text style={{ color: "#fff" }}>Exporter les tâches (CSV)</Text>
        </TouchableOpacity>
      </ScrollView>  
    </View>
  );
}
