import axios from "axios";

export const api = axios.create({
  baseURL: 'http://18.223.249.81:8080/api'
});
