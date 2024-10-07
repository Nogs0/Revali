import axios from "axios";

export const api = axios.create({
  baseURL: 'https://revali.zapto.org/api'
});

