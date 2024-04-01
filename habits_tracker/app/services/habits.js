import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApiUrl } from "./api";
import { duration } from "moment-timezone";

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

export const createTimer = async (timerData) => {
  try {
    const apiUrl = useApiUrl("/timers");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timerData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData || "Network response was not ok";
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating timer:", error);
    throw error;
  }
};

export const getTimersByTaskId = async (taskId, userId) => {
  try {
    const apiUrl = useApiUrl(`/timers/task/${taskId}/user/${userId}`);
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData || "Network response was not ok";
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching timers by task ID:", error);
    throw error;
  }
};

export const removeTask = async (taskId) => {
  try {
    const apiUrl = useApiUrl(`/tasks/${taskId}`);
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData || "Network response was not ok";
    }
    return null;
  } catch (error) {
    console.error("Error removing task:", error);
    throw error;
  }
}