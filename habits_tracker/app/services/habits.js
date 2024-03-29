import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApiUrl } from "./api";

export const getTasksByUserId = async (userId) => {
  try {
    const apiUrl = useApiUrl(`/tasks/${userId}`);
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData || "Network response was not ok";
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks by user ID:", error);
    throw error;
  }
};
