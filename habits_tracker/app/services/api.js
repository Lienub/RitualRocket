import { API_URL } from "../utils/constants/api";
export const useApiUrl = (query) => {
  return `${API_URL}${query}`;
};