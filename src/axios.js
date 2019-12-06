import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://c0bca213.ngrok.io",
  timeout: 10000
});

export default instance;
