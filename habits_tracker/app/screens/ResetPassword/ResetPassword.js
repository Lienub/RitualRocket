import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { resetPassword } from "../../services/users";
import styles from "./styles";
import Images from "../../utils/constants/images";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      navigation.navigate("Signin");
    } catch (error) {
      setError("Erreur lors de la réinitialisation du mot de passe.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.overlay} />
        <Image style={styles.logo} source={Images.Logo} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
        />
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
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Tu souhaites te connecter ?{" "}
            <Text
              onPress={() => navigation.navigate("Signin")}
              style={styles.footerLink}
            >
              Se connecter
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
