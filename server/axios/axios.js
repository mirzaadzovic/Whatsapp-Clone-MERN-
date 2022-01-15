import axios from "axios";

const newInstance = axios.create({ baseURL: "http://localhost:8080" });

export default newInstance;
