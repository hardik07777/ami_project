import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api"
});

export const buildAmi = () => API.post("/ami/build");
export const getAmis = () => API.get("/ami");
