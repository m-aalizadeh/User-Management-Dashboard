import axios from "axios";
import type { User } from "../types";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || "Failed to fetch users");
    }
    throw new Error("An unexpected error occurred");
  }
};
