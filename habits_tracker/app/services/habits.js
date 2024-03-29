import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApiUrl } from "./api";

export const getCategories = async () => {
  const apiUrl = useApiUrl("/categories");
  const response = await fetch(apiUrl);
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData || "Network response was not ok";
  }
  return await response.json();
};

export const getHabitsByCategory = async (categoryId) => {
  const apiUrl = useApiUrl(`/categories/${categoryId}/habits`);
  const response = await fetch(apiUrl);
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData || "Network response was not ok";
  }
  return await response.json();
};

export const createTask = async (taskData) => {
    try {
      const apiUrl = useApiUrl("/tasks");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData || "Network response was not ok";
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

export const createHabit = async (habitData) => {
    try {
      const apiUrl = useApiUrl("/habits");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData || "Network response was not ok";
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating habit:", error);
      throw error;
    }
  };
  