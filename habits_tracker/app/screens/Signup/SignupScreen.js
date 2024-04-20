import React, { useState, useEffect } from "react";
import {
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  WEB_CLIENT_ID,
  REDIRECT_URL_ANDROID,
  REDIRECT_URL_IOS,
} from "@env";
import {
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import SocialMediaButton from "../../components/Buttons/SocialMediaButton";
import Images from "../../utils/constants/images";
import styles from "./styles";
import { register, signInWithGoogle, storeUserInfoInStorage } from "../../services/users";

export default function SignupScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri: Platform.OS == "ios" ? REDIRECT_URL_IOS : REDIRECT_URL_ANDROID,
  });

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    token: "",
  });

  // Get user info from google
  useEffect(() => {
    if (response?.type === "success" && response.authentication.accessToken) {
      signInWithGoogle(setUserInfo, response, "register", navigation);
    }
  }, [response]);

  const registerUser = async (type) => {
    setLoading(true);
    switch (type) {
      case "register":
        try {
          const response = await register(userData);
          await storeUserInfoInStorage(response);
          navigation.navigate("MainNavigation");
        } catch (error) {
          if (error.status === "username_failed") setErrorUsername(error.message);
          else if (error.status === "email_failed") setErrorMail(error.message);
          else if (error.status === "password_failed") setErrorPassword(error.message);
          else setError(error.message);
        }
        break;
      case "google":
        promptAsync({ useProxy: true });
        break;
      default:
        break;
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
      setErrorMail("");
      setErrorPassword("");
      setErrorUsername("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error, errorMail, errorPassword, errorUsername]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.overlay} />
        <Image style={styles.logo} source={Images.Logo} />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="#aaaaaa"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setUserData({ ...userData, username: text })}
        />
        {errorUsername && <Text style={styles.textError}>{errorUsername}</Text>}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
        {errorMail && <Text style={styles.textError}>{errorMail}</Text>}
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Mot de passe"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setUserData({ ...userData, password: text })}
        />
        {errorPassword && <Text style={styles.textError}>{errorPassword}</Text>}
        <TouchableOpacity style={styles.button} onPress={() => registerUser("register")}>
          {loading ? (
            <ActivityIndicator color="#ffffff" /> // Show loading indicator when loading is true
          ) : (
            <Text style={styles.buttonTitle}>Créer son compte</Text>
          )}
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            As-tu déjà un compte ?{" "}
            <Text
              onPress={() => navigation.navigate("Signin")}
              style={styles.footerLink}
            >
              Se connecter
            </Text>
          </Text>
          <Text style={styles.textError}>{error}</Text>
        </View>
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.socialMedia}>
          <SocialMediaButton
            source={Images.GoogleIcon}
            onPress={() => registerUser("google")}
            title="Google"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}