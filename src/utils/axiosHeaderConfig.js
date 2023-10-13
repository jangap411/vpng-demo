import Cookies from "js-cookie";
import axios from "axios";

// axios config
const API = process.env.REACT_APP_API_PROD_URL;
const TOKEN = Cookies.get("access-token") ? Cookies.get("access-token") : null;

const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` },
  contentType: "application/json",
};

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  contentType: "application/json",
};

export const axiosInstance = axios.create({
  baseURL: API,
  timeout: 25000,
  headers: headers,
});

export default CONFIG;
