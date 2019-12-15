import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://98e944a8.ngrok.io",
  timeout: 10000
});

export default instance;
