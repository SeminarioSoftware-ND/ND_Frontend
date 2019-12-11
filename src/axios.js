import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://5f34df0f.ngrok.io",
  timeout: 10000
});

export default instance;
