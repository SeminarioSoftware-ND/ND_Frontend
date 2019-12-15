import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://dcd3e3bc.ngrok.io",
  timeout: 70000
});

export default instance;
