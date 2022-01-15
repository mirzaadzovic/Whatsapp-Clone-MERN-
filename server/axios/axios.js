import axios from "axios";

const newInstance = axios.create({ baseURL: "http://localhost:8080" });
newInstance.defaults.withCredentials = true;

export default newInstance;
