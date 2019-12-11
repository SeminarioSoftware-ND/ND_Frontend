import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://69bf8b8e.ngrok.io",
  timeout: 10000
});

export default instance;
