import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { removeAccount, removeUserInfo } from "../../services/users";
import { getTasksByUserId } from "../../services/habits";
import AwesomeAlert from "react-native-awesome-alerts";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { getStyles } from './styles';
import { useTheme } from "../../components/Theme";
import { COLORS } from "../../utils/constants/colors";

export default function ProfileScreen({ navigation, route }) {
  const { user } = route.params;
  const [csvData, setCsvData] = useState([]);
  const isFocused = useIsFocused();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme))

  const handleDeleteAccount = () => {
    removeAccount(user.userId);
    removeUserInfo();
    setShowDeleteAlert(false);
    navigation.navigate("AuthNavigation");
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserTasks(); // Fetch tasks whenever user info is fetched or screen is focused
    }
  }, [isFocused]);

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
      const headers = Object.keys(csvData[0]).join(",") + "\n";

      const csvContent =
        headers + csvData.map((row) => Object.values(row).join(",")).join("\n");

      const filePath = `${FileSystem.documentDirectory}user_tasks.csv`;

      await FileSystem.writeAsStringAsync(filePath, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (Platform.OS === "ios" || Platform.OS === "android") {
        await Sharing.shareAsync(filePath);
      } else {
        console.error("Plateforme non supportée pour le partage de fichier.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la création ou du partage du fichier CSV:",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action
          icon={() => <Ionicons name="close" size={30} color="#fff" />}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Profil" titleStyle={styles.appbarTitle} />
        <Appbar.Action
          icon={() => <Ionicons name="pencil" size={20} color="#fff" />}
          onPress={() => navigation.navigate("ChangeInformations")}
        />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <Ionicons name="person-circle" size={100} color={COLORS[theme].text} style={{ alignSelf: "center" }} />
          <View style={styles.textIcon}>
            <Ionicons name="id-card" size={20} color={COLORS[theme].text} style={{ marginTop: 20, alignSelf: "center" }} />
            <Text style={styles.title}>{user.username}</Text>
          </View>
          <View style={styles.textIcon}>
            <Ionicons name="mail" size={20} color={COLORS[theme].text} style={{ marginTop: 20, alignSelf: "center" }} />
            <Text style={styles.title}>{user.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            removeUserInfo();
            navigation.navigate("AuthNavigation");
          }}
        >
          <View style={styles.textIcon}>
            <Ionicons name="log-out" size={20} color="white" style={{ alignSelf: "center" }} />
            <Text style={{ color: "#fff" }}>Se déconnecter</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("ChangePassword");
          }}
        >
          <View style={styles.textIcon}>
            <Ionicons name="key" size={20} color="white" style={{ alignSelf: "center" }} />
            <Text style={{ color: "#fff" }}>Changer le mot de passe</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={exportCSV} disabled={(csvData.length == 0)}>
          <View style={styles.textIcon}>
            <Ionicons name="person-add" size={20} color="white" style={{ alignSelf: "center" }} />
            <Text style={{ color: "#fff" }}>
              {
                csvData.length == 0
                  ? "Aucune tâche à exporter (CSV)"
                  : "Exporter vos tâches (CSV)"
              }
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRemove} onPress={() => setShowDeleteAlert(true)}>
          <View style={styles.textIcon}>
            <Ionicons name="trash" size={20} color="white" style={{ alignSelf: "center" }} />
            <Text style={{ color: "#fff" }}>Supprimer votre compte</Text>
          </View>
        </TouchableOpacity>

        <AwesomeAlert
          show={showDeleteAlert}
          showProgress={false}
          title="Supprimer votre compte"
          message="😞 Vous nous quittez deja ? Êtes-vous sûr de vouloir supprimer votre compte ?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Je refuse"
          confirmText="J'accepte"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => setShowDeleteAlert(false)}
          onConfirmPressed={handleDeleteAccount}
          confirmButtonTextStyle={{ fontSize: 20 }}
          cancelButtonTextStyle={{ fontSize: 20 }}
          messageStyle={{ fontSize: 15, textAlign: "center" }}
          titleStyle={{ fontSize: 20, color: COLORS[theme].text }}
          contentContainerStyle={
            {
              backgroundColor: COLORS[theme].tertiary,
              shadowColor: 'black',
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
            }
          }
          cancelButtonColor={COLORS[theme].primary}
        />
      </ScrollView>
    </View>
  );
}
