import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://83a1129d.ngrok.io",
  timeout: 10000
});

export default instance;
