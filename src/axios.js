import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://591a4cb1.ngrok.io",
  timeout: 10000
});

export default instance;
