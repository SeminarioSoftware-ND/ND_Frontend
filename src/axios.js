import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "https://34ba82e7.ngrok.io",
  timeout: 70000
});

export default instance;
