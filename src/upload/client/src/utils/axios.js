import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3002/api/v1/shopkeepers",
});
export default axiosInstance;
