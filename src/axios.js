import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://b74cc57c.ngrok.io",
  timeout: 10000
});

export default instance;
