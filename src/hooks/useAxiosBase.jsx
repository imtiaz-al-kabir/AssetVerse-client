import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosBase = () => {
  return instance;
};

export default useAxiosBase;
