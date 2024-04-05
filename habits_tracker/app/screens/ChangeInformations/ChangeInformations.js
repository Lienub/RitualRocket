import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getUserInfo, changeUserInformations } from "../../services/users";
import styles from "./styles";
import Images from "../../utils/constants/images";

export default function ResetPasswordScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
        setEmail(userInfo.email);
        setUsername(userInfo.username);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleResetPassword = async () => {
    if (!email || !username) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      await changeUserInformations(email, username, user.userId);
      navigation.navigate("Profile");
    } catch (error) {
      setError("Erreur lors des modifications.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
            <Appbar.Action
                icon={() => <Ionicons name="close" size={30} color="#fff" />}
                onPress={() => navigation.goBack()}
            />
            <Appbar.Content title="Modifier" titleStyle={styles.title} />
        </Appbar.Header>
      <View style={styles.background}>
        <View style={styles.overlay} />
        <Image style={styles.logo} source={Images.Logo} />
        <TextInput
          style={styles.input}
          defaultValue = {user.username}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          defaultValue = {user.email}
          placeholder="Adresse e-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
        />
        {error ? <Text style={styles.textError}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonTitle}>
              Valider
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
