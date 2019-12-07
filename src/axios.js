import axios from "axios";
import { timeout } from "q";

const instance = axios.create({
  baseURL: "http://ac296afe.ngrok.io",
  timeout: 10000
});

export default instance;
