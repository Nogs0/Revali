import axios from "axios";

export const api = axios.create({
  baseURL: 'http://revali.zapto.org/api'
});

