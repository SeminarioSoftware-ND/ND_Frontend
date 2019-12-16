import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "https://47f70627.ngrok.io",
  timeout: 70000
});

export default instance;
