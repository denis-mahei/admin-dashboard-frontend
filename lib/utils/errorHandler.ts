import axios from "axios";

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401)
      throw new Error("Session expired. Please log in again.");
    if (status === 404) throw new Error("Not found!");
  }
};
