import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://ef7b37a4.ngrok.io",
  timeout: 10000
});

export default instance;
