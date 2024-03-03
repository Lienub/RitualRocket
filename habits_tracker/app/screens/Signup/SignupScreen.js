import React, { useState, useEffect } from "react";
import {
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  WEB_CLIENT_ID,
  REDIRECT_URL,
} from '@env';;
import {
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import SocialMediaButton from "../../components/Buttons/SocialMediaButton";
import Images from "../../utils/constants/images";
import styles from "./styles";
import { register, signInWithGoogle } from "../../services/users";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function SignupScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [userInfo, setUserInfo] = useState({});

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri: REDIRECT_URL,
  });

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    token: "",
  });

  // Get user info from google
  useEffect(() => {
    signInWithGoogle(setUserInfo, response);
  }, [response]);

  useEffect(() => {
    if (
      error !== "" ||
      errorMail !== "" ||
      errorPassword !== "" ||
      errorUsername !== ""
    ) {
      setTimeout(() => {
        setError("");
        setErrorMail("");
        setErrorPassword("");
        setErrorUsername("");
      }, 3000);
    }
  }, [error || errorMail || errorPassword || errorUsername]);

  const registerUser = async () => {
    const response = await register(userData)
      .then((response) => {
        setUserData({ ...userData, token: response.token });
      })
      .catch((error) => {
        if (error.status == "username_failed") setErrorUsername(error.message);
        if (error.status == "email_failed") setErrorMail(error.message);
        if (error.status == "password_failed") setErrorPassword(error.message);
        if (error.status == "failed") setError(error.message);
      });
  };

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
        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.buttonTitle}>Créer son compte</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            As-tu deja un compte ?{" "}
            <Text
              onPress={() => console.log("Login")}
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
            onPress={() => promptAsync({ useProxy: true })}
            title="Google"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
