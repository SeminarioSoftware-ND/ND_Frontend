import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "https://e6a4a0c1.ngrok.io",
  timeout: 70000
});

export default instance;
