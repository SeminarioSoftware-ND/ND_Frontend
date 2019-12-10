import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://8770e654.ngrok.io",
  timeout: 10000
});

export default instance;
