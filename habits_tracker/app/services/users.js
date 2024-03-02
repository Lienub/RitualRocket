import { useApiUrl } from "./api";

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
