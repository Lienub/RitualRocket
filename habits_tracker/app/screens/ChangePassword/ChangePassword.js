import React, { useState, useEffect, useMemo } from "react";
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
import { resetPassword, removeUserInfo } from "../../services/users";
import {getStyles} from "./styles";
import { useTheme } from "../../components/Theme";
import Images from "../../utils/constants/images";

export default function ResetPasswordScreen({ navigation, route }) {
  const { user } = route.params;
  const email = user.email;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme));

  const handleResetPassword = async () => {
    if (!email || !newPassword || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, newPassword);
      removeUserInfo();
      navigation.navigate("Signin");
    } catch (error) {
      setError("Erreur lors de la réinitialisation du mot de passe.");
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
            <Appbar.Content title="Changer de mot de passe" titleStyle={styles.title} />
        </Appbar.Header>
      <View style={styles.background}>
        <View style={styles.overlay} />
        <Image style={styles.logo} source={Images.Logo} />
        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={(text) => setNewPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmer nouveau mot de passe"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
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
              Réinitialiser le mot de passe
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
