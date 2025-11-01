import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const api = axios.create({ baseURL });

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
