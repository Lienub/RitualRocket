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
