// api.js
import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_AUTH_URI}`, // change to your backend URL
});

export default API;