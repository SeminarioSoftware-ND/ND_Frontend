import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "https://77170323.ngrok.io",
  timeout: 70000
});

export default instance;
