import React, { useState, useEffect } from "react";
import {
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  WEB_CLIENT_ID,
  REDIRECT_URL,
} from "@env";
import {
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import SocialMediaButton from "../../components/Buttons/SocialMediaButton";
import Images from "../../utils/constants/images";
import styles from "./styles";
import { login, signInWithGoogle } from "../../services/users";

export default function SigninScreen({ navigation }) {
  const [error, setError] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri: REDIRECT_URL,
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication.accessToken) {
      signInWithGoogle(setUserData, response, "login", navigation);
    }
  }, [response]);

  const signInUser = async (type) => {
    setLoading(true); // Set loading state to true when sign-in is initiated
    switch (type) {
      case "login":
        try {
          await login(userData);
          navigation.navigate('MainNavigation');
        } catch (error) {
          if (error.status === "email_failed") setErrorMail(error.message);
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
    setLoading(false); // Set loading state to false after sign-in attempt
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.overlay} />
        <Image style={styles.logo} source={Images.Logo} />
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
        <TouchableOpacity style={styles.button} onPress={() => signInUser('login')}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonTitle}>Se connecter</Text>
          )}
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Tu n'as pas de compte?{" "}
            <Text
              onPress={() => navigation.navigate("Signup")}
              style={styles.footerLink}
            >
              Créer un compte
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
            onPress={() => signInUser("google")}
            title="Google"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
