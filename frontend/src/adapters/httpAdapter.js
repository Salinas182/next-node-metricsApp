import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER}`,
});

const httpAdapter = {
  get: (url, params = {}) => api.get(url, { params }),
  post: (url, data) =>
    api.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
};

export default httpAdapter;
