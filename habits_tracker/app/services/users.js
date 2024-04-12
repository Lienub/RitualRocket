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
 * Resets the user's password.
 * @param {string} email - User's email.
 * @param {string} newPassword - New password.
 * @returns {Promise<string>} - A promise that resolves to a success message.
 */
export const resetPassword = async (email, newPassword) => {
  const apiUrl = useApiUrl("/auth/reset-password");

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData || "Network response was not ok";
  }

  const responseData = await response.json();
  return responseData.message;
};

/**
 * Retrieves user information from the Google API.
 * @param {string} token - Access token obtained from Google authentication.
 * @param {Function} setUserInfo - Function to set user information in state.
 * @returns {Promise<void>}
 */
export const createUserGoogleId = async (userFromGoogle, setUserInfo) => {
  let data = await register(userFromGoogle);
  AsyncStorage.setItem("user", JSON.stringify(data));
  setUserInfo(data);
};

/**
 * Retrieves user information from the Google API and logs the user in.
 * @param {*} token
 * @param {*} setUserInfo
 */
export const loginUserGoogleId = async (userFromGoogle, setUserInfo) => {
  let data = await login(userFromGoogle);
  AsyncStorage.setItem("user", JSON.stringify(data));
  setUserInfo(data);
};

/**
 * Signs in with Google authentication and sets the user info.
 * @param {Function} setUserInfo - Function to set user information in state.
 * @param {Object} response - Response object from Google authentication.
 * @param {string} type - Type of action (register or login).
 * @param {Object} navigation - Navigation object.
 */

const fetchUserFromGoogle = async (token) => {
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data from Google API");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user from Google:", error);
    throw error;
  }
};

export const signInWithGoogle = async (
  setUserInfo,
  response,
  type,
  navigation
) => {
  try {
    const userFromGoogle = await fetchUserFromGoogle(
      response.authentication.accessToken
    );

    const userExistsInDatabase = await checkUserExistsInDatabase(
      userFromGoogle.id
    );

    const user = {
      email: userFromGoogle.email,
      username: userFromGoogle.name,
      googleId: userFromGoogle.id,
      password: userFromGoogle.id,
      token: response.authentication.accessToken,
    };

    if (userExistsInDatabase && userExistsInDatabase.id) {
      await loginUserGoogleId(user, setUserInfo);
    } else {
      await createUserGoogleId(user, setUserInfo);
    }

    navigation.navigate("MainNavigation");
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

const checkUserExistsInDatabase = async (googleId) => {
  const apiUrl = useApiUrl("/auth/verify-google-id");
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ googleId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData || "Network response was not ok";
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
};
/**
 * Checks if the user is authenticated via Google.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is authenticated, false otherwise.
 */
export const authUserExists = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return !!user;
  } catch (error) {}
};

/**
 * This function gets the user information from the AsyncStorage
 * @returns user info
 */
export const getUserInfo = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  } catch (error) {}
};

/**
 * This function stores the user information in the AsyncStorage
 * @param {*} userInfo
 */
export const storeUserInfoInStorage = async (userInfo) => {
  try {
    const user = {
      userId: userInfo.userId,
      email: userInfo.email,
      username: userInfo.username,
      password: userInfo.password,
      googleId: userInfo.googleId,
      token: userInfo.token,
    };
    AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error) {}
};

/**
 * This function removes the user information from the AsyncStorage
 */
export const removeUserInfo = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {}
};

export const changeUserInformations = async (email, username, userId) => {
  const apiUrl = useApiUrl("/auth/change-informations");
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, userId}),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData || "Network response was not ok";
  }

  storeUserInfoInStorage({ email, username, userId });
}
