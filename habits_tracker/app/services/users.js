import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApiUrl } from "./api";

/**
 * This function will register the user without google
 * @param {*} userData 
 * @returns 
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
    const errorMessage = errorData || "Network response was not ok";
    throw errorMessage;
  }

  return await response.json();
};

/**
 * This function will get the user info from the google api
 * @param {*} token 
 * @param {*} setUserInfo 
 * @param {*} response 
 * @returns 
 */
export const getUserInfo = async (token, setUserInfo, response) => {
  if (!token) return;
  try {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUserInfo(user);
  } catch (error) {
    console.error(
      "Failed to fetch user data:",
      response.status,
      response.statusText
    );
  }
};

/**
 * This function will sign in with google and set the user info
 * @param {*} setUserInfo 
 * @param {*} response 
 */
export const signInWithGoogle = async (setUserInfo, response) => {
  try {
    const userJSON = await AsyncStorage.getItem("user");
    console.log(response?.type);
    if (userJSON) {
      setUserInfo(JSON.parse(userJSON));
    } else if (response?.type === "success") {
      getUserInfo(response.authentication.accessToken, setUserInfo, response);
    }
  } catch (error) {
    console.error("Error retrieving user data from AsyncStorage:", error);
  }
};
