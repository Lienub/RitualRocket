import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApiUrl } from "./api";

/**
 * Registers the user.
 * @param {Object} userData - User data to be registered.
 * @returns {Promise<Object>} - A promise that resolves to the response data.
 */
export const register = async (userData) => {
  const apiUrl = useApiUrl("/auth/register");

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData || "Network response was not ok";
  }

  return await response.json();
};

/**
 * Logins the user
 * @param {*} userData 
 * @returns 
 */
export const login = async (userData) => {
  const apiUrl = useApiUrl("/auth/login");

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData || "Network response was not ok";
  }

  return await response.json();
};

/**
 * Retrieves user information from the Google API.
 * @param {string} token - Access token obtained from Google authentication.
 * @param {Function} setUserInfo - Function to set user information in state.
 * @returns {Promise<void>}
 */
export const createUserGoogleId = async (token, setUserInfo) => {
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data from Google API");
    }

    const user = await response.json();
    const createUser = {
      email: user.email,
      username: user.name,
      password: user.id,
      googleId: user.id,
      token,
    };
    
    // Check if user exists in AsyncStorage before registering
    const userExists = await authUserExists();
    if (!userExists) {
      await register(createUser);
      AsyncStorage.setItem("user", JSON.stringify(createUser));
      setUserInfo(createUser);
    }
  } catch (error) {
  }
};

/**
 * Retrieves user information from the Google API and logs the user in.
 * @param {*} token 
 * @param {*} setUserInfo 
 */
export const loginUserGoogleId = async (token, setUserInfo) => {
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data from Google API");
    }

    const user = await response.json();
    const getUser = {
      email: user.email,
      username: user.name,
      password: user.id,
      googleId: user.id,
      token,
    };

    const userExists = await authUserExists();
    if (!userExists) {
      AsyncStorage.setItem("user", JSON.stringify(getUser));
      setUserInfo(getUser);
      await login(getUser);
    } else {
      AsyncStorage.setItem("user", JSON.stringify(getUser));
      setUserInfo(getUser);
      await register(getUser);
    }
  } catch (error) {
  }
};

/**
 * Signs in with Google authentication and sets the user info.
 * @param {Function} setUserInfo - Function to set user information in state.
 * @param {Object} response - Response object from Google authentication.
 * @param {string} type - Type of action (register or login).
 */
export const signInWithGoogle = async (setUserInfo, response, type, navigation) => {
  try {
    switch (type) {
      case "register":
        await createUserGoogleId(response.authentication.accessToken, setUserInfo);
        navigation.navigate('MainNavigation')
        break;
      case "login":
        await loginUserGoogleId(response.authentication.accessToken, setUserInfo);
        navigation.navigate('MainNavigation')
        break;
      default:
        break;
    }
  } catch (error) {
  }
};

/**
 * Checks if the user is authenticated via Google.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is authenticated, false otherwise.
 */
export const authUserExists = async () => {
  try {
    AsyncStorage.clear();
    const user = await AsyncStorage.getItem("user");
    return !!user;
  } catch (error) {
  }
};