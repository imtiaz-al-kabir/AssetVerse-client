import axios from "axios";

const instance = axios.create({
  baseURL: "https://asseet-vers-server.vercel.app",
  withCredentials: true,
});

const useAxiosBase = () => {
  return instance;
};

export default useAxiosBase;
